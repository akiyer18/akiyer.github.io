# 🚀 Supabase Setup Guide for Growth Mindset Calendar

This guide will help you set up Supabase for your gamified calendar system with Google OAuth authentication.

## 📋 Prerequisites

1. A Supabase account ([supabase.com](https://supabase.com))
2. A Google Cloud Console project for OAuth

## 🏗️ Step 1: Create Supabase Project

1. **Log in to Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Sign in or create an account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Name: `growth-mindset-calendar`
   - Generate a strong database password
   - Choose your region (closest to your users)
   - Click "Create new project"

3. **Wait for Setup**
   - Initial setup takes 2-3 minutes
   - Your project will be ready when you see the dashboard

## 🗄️ Step 2: Set Up Database Schema

1. **Open SQL Editor**
   - In your Supabase dashboard, go to "SQL Editor"
   - Click "New Query"

2. **Run the Schema**
   - Copy the entire contents of `supabase_schema.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute

3. **Verify Tables**
   - Go to "Table Editor" to see your tables:
     - `user_profiles` - User data and stats
     - `events` - Calendar events
     - `rewards` - Points history
     - `achievements` - User achievements

## 🔑 Step 3: Configure Google OAuth

### In Google Cloud Console:

1. **Create OAuth Credentials**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Select/create a project
   - Enable "Google+ API" in API & Services
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"

2. **Configure OAuth Client**
   - Application type: "Web application"
   - Name: "Growth Mindset Calendar"
   - **Authorized JavaScript origins:**
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs:**
     - `https://your-project-ref.supabase.co/auth/v1/callback`
   - Replace `your-project-ref` with your actual Supabase project reference

3. **Save Credentials**
   - Note down your "Client ID" and "Client Secret"

### In Supabase Dashboard:

1. **Configure Google Provider**
   - Go to "Authentication" → "Providers"
   - Find "Google" and click to configure
   - **Enable Google provider**
   - Enter your Google OAuth credentials:
     - Client ID: `your-google-client-id`
     - Client Secret: `your-google-client-secret`
   - Click "Save"

2. **Configure Site URL**
   - Go to "Authentication" → "URL Configuration"
   - **Site URL:** `https://yourdomain.com` (production)
   - **Redirect URLs:** Add your production and dev URLs

## 🔧 Step 4: Environment Configuration

1. **Get Supabase Credentials**
   - In your Supabase dashboard, go to "Settings" → "API"
   - Copy the **Project URL** and **Public anon key**

2. **Create `.env` File**
   ```bash
   cp .env.example .env
   ```

3. **Fill Environment Variables**
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here

   # Development Settings
   VITE_ENV=development

   # Optional: Google OAuth (for calendar sync)
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

## 🧪 Step 5: Test the Setup

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Visit your app at `http://localhost:5173`
   - Navigate to the calendar section
   - Try signing in with Google
   - Verify user profile creation in Supabase

3. **Test Calendar Features**
   - Create a new event
   - Mark an event as complete
   - Check that points are awarded
   - Verify data appears in Supabase tables

## 🔒 Security Features Included

- **Row Level Security (RLS)** - Users can only access their own data
- **Authentication Required** - All data operations require valid user session
- **Input Validation** - Database constraints prevent invalid data
- **Secure Functions** - Database functions use `SECURITY DEFINER`

## 📊 Database Tables Overview

### `user_profiles`
- User stats, level, points, preferences
- Extends Supabase auth.users table
- Auto-created on first login

### `events`
- Calendar events with gamification
- Different types: quest, appointment, milestone, trip, habit
- Points awarded on completion

### `rewards`
- Points history and transaction log
- Tracks all point-earning activities
- Used for stats calculation

### `achievements`
- Badge system for user milestones
- Automatically awarded based on stats
- Customizable achievement types

## 🚀 Production Deployment

1. **Update Environment Variables**
   - Set production Supabase URL
   - Update OAuth redirect URLs
   - Configure production domain

2. **Database Migrations**
   - Supabase handles migrations automatically
   - Use Dashboard → SQL Editor for schema updates

3. **Monitor Usage**
   - Check Supabase dashboard for usage stats
   - Monitor authentication logs
   - Set up usage alerts if needed

## 🔧 Troubleshooting

### Authentication Issues
- Verify OAuth redirect URLs match exactly
- Check that Google OAuth is enabled in Supabase
- Ensure site URL is configured correctly

### Database Errors
- Check RLS policies are correctly applied
- Verify user has proper permissions
- Look at Supabase logs for detailed error messages

### Local Development
- Make sure `.env` file is not committed to git
- Use different Supabase projects for dev/prod
- Test with guest mode if Supabase is not configured

## 📞 Support

If you encounter issues:
1. Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
2. Review your browser's developer console for errors
3. Check Supabase dashboard logs
4. Verify all environment variables are set correctly

---

**Your gamified calendar is now ready! 🎉**

Users can create events, earn points, level up, and track their productivity journey with full cloud sync and authentication. 