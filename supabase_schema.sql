-- Supabase Database Schema for Growth Mindset Calendar
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables

-- Users table (extends auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    level INTEGER DEFAULT 1,
    total_points INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    days_active INTEGER DEFAULT 0,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table (calendar events)
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type TEXT DEFAULT 'quest' CHECK (event_type IN ('quest', 'appointment', 'milestone', 'trip', 'habit')),
    repeat_pattern TEXT CHECK (repeat_pattern IN ('daily', 'weekly', 'monthly', 'yearly')),
    points_value INTEGER DEFAULT 10,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rewards table (points history)
CREATE TABLE public.rewards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    points INTEGER NOT NULL,
    category TEXT DEFAULT 'general',
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    achievement_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT '🏆',
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_user_id ON public.events(user_id);
CREATE INDEX idx_events_start_time ON public.events(start_time);
CREATE INDEX idx_events_completed ON public.events(completed);
CREATE INDEX idx_rewards_user_id ON public.rewards(user_id);
CREATE INDEX idx_rewards_earned_at ON public.rewards(earned_at);
CREATE INDEX idx_achievements_user_id ON public.achievements(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view own events" ON public.events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own events" ON public.events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own events" ON public.events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own events" ON public.events FOR DELETE USING (auth.uid() = user_id);

-- Rewards policies
CREATE POLICY "Users can view own rewards" ON public.rewards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own rewards" ON public.rewards FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements" ON public.achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions for gamification

-- Function to calculate user stats
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'level', COALESCE(up.level, 1),
        'total_points', COALESCE(up.total_points, 0),
        'current_streak', COALESCE(up.current_streak, 0),
        'days_active', COALESCE(up.days_active, 0),
        'quests_completed', COALESCE(quest_count.count, 0),
        'total_rewards', COALESCE(reward_sum.total, 0)
    ) INTO result
    FROM public.user_profiles up
    LEFT JOIN (
        SELECT user_id, COUNT(*) as count
        FROM public.events 
        WHERE completed = true AND user_id = user_uuid
        GROUP BY user_id
    ) quest_count ON up.id = quest_count.user_id
    LEFT JOIN (
        SELECT user_id, SUM(points) as total
        FROM public.rewards
        WHERE user_id = user_uuid
        GROUP BY user_id
    ) reward_sum ON up.id = reward_sum.user_id
    WHERE up.id = user_uuid;
    
    RETURN COALESCE(result, '{"level": 1, "total_points": 0, "current_streak": 0, "days_active": 0, "quests_completed": 0, "total_rewards": 0}'::JSON);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user stats when event is completed
CREATE OR REPLACE FUNCTION update_user_stats_on_event_completion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.completed = true AND OLD.completed = false THEN
        -- Add reward entry
        INSERT INTO public.rewards (user_id, title, description, points)
        VALUES (NEW.user_id, 'Quest Completed', 'Completed: ' || NEW.title, NEW.points_value);
        
        -- Update user profile stats
        UPDATE public.user_profiles 
        SET 
            total_points = total_points + NEW.points_value,
            level = FLOOR((total_points + NEW.points_value) / 100) + 1,
            updated_at = NOW()
        WHERE id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger for auto-updating stats
CREATE TRIGGER update_stats_on_event_completion
    AFTER UPDATE ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats_on_event_completion();

-- Function to get leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    user_id UUID,
    full_name TEXT,
    avatar_url TEXT,
    total_points INTEGER,
    level INTEGER,
    quests_completed BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.id,
        up.full_name,
        up.avatar_url,
        up.total_points,
        up.level,
        COALESCE(quest_count.count, 0) as quests_completed
    FROM public.user_profiles up
    LEFT JOIN (
        SELECT user_id, COUNT(*) as count
        FROM public.events 
        WHERE completed = true
        GROUP BY user_id
    ) quest_count ON up.id = quest_count.user_id
    ORDER BY up.total_points DESC, up.level DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert some sample event types for reference
INSERT INTO public.events (user_id, title, description, start_time, end_time, event_type, points_value, tags) VALUES
-- These are examples - they will fail due to RLS unless a real user exists
-- Remove these lines or replace with actual user IDs for testing
-- ('00000000-0000-0000-0000-000000000000', 'Morning Workout', 'Daily exercise routine', NOW(), NOW() + INTERVAL '1 hour', 'habit', 15, ARRAY['health', 'fitness']),
-- ('00000000-0000-0000-0000-000000000000', 'Team Meeting', 'Weekly team sync', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 1 hour', 'appointment', 5, ARRAY['work']),
-- ('00000000-0000-0000-0000-000000000000', 'Project Deadline', 'Complete final presentation', NOW() + INTERVAL '1 week', NOW() + INTERVAL '1 week 2 hours', 'milestone', 50, ARRAY['work', 'important']);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
GRANT ALL ON public.events TO anon, authenticated;
GRANT ALL ON public.rewards TO anon, authenticated;
GRANT ALL ON public.achievements TO anon, authenticated;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated; 
