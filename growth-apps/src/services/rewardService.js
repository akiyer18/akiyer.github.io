import { supabase, isSupabaseConfigured } from './supabaseClient'
import { 
  saveRewardsLocally, 
  getRewardsLocally, 
  saveUserStatsLocally, 
  getUserStatsLocally 
} from '../utils/localStorageFallback'

// Get user rewards/points history
export const getUserRewards = async (userId) => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false })

      if (error) throw error
      return { data: data || [], error: null }
    } else {
      // Fallback to localStorage
      const rewards = getRewardsLocally(userId)
      return { data: rewards, error: null }
    }
  } catch (error) {
    console.error('Error getting rewards:', error)
    // Fallback to localStorage on error
    const rewards = getRewardsLocally(userId)
    return { data: rewards, error: error.message }
  }
}

// Get user stats (total points, level, etc.)
export const getUserStats = async (userId) => {
  try {
    if (isSupabaseConfigured()) {
      // Get aggregated stats from rewards table
      const { data: rewards, error: rewardsError } = await supabase
        .from('rewards')
        .select('points')
        .eq('user_id', userId)

      if (rewardsError) throw rewardsError

      // Get completed events count
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('id, completed_at')
        .eq('user_id', userId)
        .eq('completed', true)

      if (eventsError) throw eventsError

      const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0)
      const questsCompleted = events.length
      const level = Math.floor(totalPoints / 100) + 1

      // Calculate streak (consecutive days with completed events)
      const currentStreak = calculateStreak(events)

      const stats = {
        level,
        totalPoints,
        questsCompleted,
        daysActive: getDaysActive(events),
        currentStreak,
        lastUpdated: new Date().toISOString()
      }

      return { data: stats, error: null }
    } else {
      // Fallback to localStorage
      const stats = getUserStatsLocally(userId)
      return { data: stats, error: null }
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    // Fallback to localStorage on error
    const stats = getUserStatsLocally(userId)
    return { data: stats, error: error.message }
  }
}

// Add reward/points to user
export const addReward = async (userId, rewardData) => {
  const reward = {
    id: crypto.randomUUID(),
    user_id: userId,
    title: rewardData.title,
    description: rewardData.description || '',
    points: rewardData.points,
    category: rewardData.category || 'general',
    earned_at: new Date().toISOString()
  }

  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('rewards')
        .insert([reward])
        .select()

      if (error) throw error
      return { data: data[0], error: null }
    } else {
      // Fallback to localStorage
      const existingRewards = getRewardsLocally(userId)
      const updatedRewards = [reward, ...existingRewards]
      const { success, error } = saveRewardsLocally(updatedRewards, userId)
      
      if (!success) throw new Error(error)

      // Update stats locally
      await updateUserStatsLocally(userId, reward.points)
      
      return { data: reward, error: null }
    }
  } catch (error) {
    console.error('Error adding reward:', error)
    return { data: null, error: error.message }
  }
}

// Get leaderboard (top users by points)
export const getLeaderboard = async (limit = 10) => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .rpc('get_leaderboard', { limit_count: limit })

      if (error) throw error
      return { data: data || [], error: null }
    } else {
      // Fallback - return empty leaderboard for local mode
      return { data: [], error: 'Leaderboard not available in offline mode' }
    }
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    return { data: [], error: error.message }
  }
}

// Helper function to calculate streak
const calculateStreak = (events) => {
  if (!events || events.length === 0) return 0

  // Sort events by completion date
  const sortedEvents = events
    .filter(e => e.completed_at)
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))

  if (sortedEvents.length === 0) return 0

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (const event of sortedEvents) {
    const eventDate = new Date(event.completed_at)
    eventDate.setHours(0, 0, 0, 0)

    const daysDiff = Math.floor((currentDate - eventDate) / (1000 * 60 * 60 * 24))

    if (daysDiff === streak) {
      streak++
    } else if (daysDiff === streak + 1) {
      streak++
    } else {
      break
    }

    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

// Helper function to calculate days active
const getDaysActive = (events) => {
  if (!events || events.length === 0) return 0

  const uniqueDays = new Set()
  events.forEach(event => {
    if (event.completed_at) {
      const date = new Date(event.completed_at)
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      uniqueDays.add(dayKey)
    }
  })

  return uniqueDays.size
}

// Update user stats locally
const updateUserStatsLocally = async (userId, points) => {
  try {
    const stats = getUserStatsLocally(userId)
    stats.totalPoints += points
    stats.questsCompleted += 1
    
    // Level up calculation (every 100 points = 1 level)
    const newLevel = Math.floor(stats.totalPoints / 100) + 1
    if (newLevel > stats.level) {
      stats.level = newLevel
    }

    // Update days active
    const today = new Date().toDateString()
    if (stats.lastActiveDate !== today) {
      stats.daysActive += 1
      stats.lastActiveDate = today
      
      // Update streak
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (stats.lastActiveDate === yesterday.toDateString()) {
        stats.currentStreak += 1
      } else {
        stats.currentStreak = 1
      }
    }

    saveUserStatsLocally(stats, userId)
  } catch (error) {
    console.error('Error updating user stats locally:', error)
  }
}

// Get available achievements/badges
export const getAchievements = (userStats) => {
  const achievements = []

  // Level-based achievements
  if (userStats.level >= 5) {
    achievements.push({
      id: 'level_5',
      title: 'Rising Star',
      description: 'Reached level 5',
      icon: '⭐',
      earned: true
    })
  }

  if (userStats.level >= 10) {
    achievements.push({
      id: 'level_10',
      title: 'Productivity Master',
      description: 'Reached level 10',
      icon: '🏆',
      earned: true
    })
  }

  // Streak-based achievements
  if (userStats.currentStreak >= 3) {
    achievements.push({
      id: 'streak_3',
      title: 'On Fire',
      description: '3-day streak',
      icon: '🔥',
      earned: true
    })
  }

  if (userStats.currentStreak >= 7) {
    achievements.push({
      id: 'streak_7',
      title: 'Weekly Warrior',
      description: '7-day streak',
      icon: '⚡',
      earned: true
    })
  }

  // Quest-based achievements
  if (userStats.questsCompleted >= 10) {
    achievements.push({
      id: 'quests_10',
      title: 'Quest Hunter',
      description: 'Completed 10 quests',
      icon: '🎯',
      earned: true
    })
  }

  if (userStats.questsCompleted >= 50) {
    achievements.push({
      id: 'quests_50',
      title: 'Quest Legend',
      description: 'Completed 50 quests',
      icon: '👑',
      earned: true
    })
  }

  return achievements
} 