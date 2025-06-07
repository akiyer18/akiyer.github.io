// localStorage fallback for when Supabase is not configured or offline

const LOCAL_STORAGE_KEYS = {
  EVENTS: 'calendar_events',
  REWARDS: 'user_rewards',
  USER_STATS: 'user_stats',
  PREFERENCES: 'user_preferences'
}

// Helper function to get user-specific key
const getUserKey = (baseKey, userId = 'guest') => {
  return `${baseKey}_${userId}`
}

// Events management
export const saveEventsLocally = (events, userId = 'guest') => {
  try {
    const key = getUserKey(LOCAL_STORAGE_KEYS.EVENTS, userId)
    localStorage.setItem(key, JSON.stringify(events))
    return { success: true, error: null }
  } catch (error) {
    console.error('Error saving events locally:', error)
    return { success: false, error }
  }
}

export const getEventsLocally = (userId = 'guest') => {
  try {
    const key = getUserKey(LOCAL_STORAGE_KEYS.EVENTS, userId)
    const events = localStorage.getItem(key)
    return events ? JSON.parse(events) : []
  } catch (error) {
    console.error('Error getting events locally:', error)
    return []
  }
}

// Rewards management
export const saveRewardsLocally = (rewards, userId = 'guest') => {
  try {
    const key = getUserKey(LOCAL_STORAGE_KEYS.REWARDS, userId)
    localStorage.setItem(key, JSON.stringify(rewards))
    return { success: true, error: null }
  } catch (error) {
    console.error('Error saving rewards locally:', error)
    return { success: false, error }
  }
}

export const getRewardsLocally = (userId = 'guest') => {
  try {
    const key = getUserKey(LOCAL_STORAGE_KEYS.REWARDS, userId)
    const rewards = localStorage.getItem(key)
    return rewards ? JSON.parse(rewards) : []
  } catch (error) {
    console.error('Error getting rewards locally:', error)
    return []
  }
}

// User stats management
export const saveUserStatsLocally = (stats, userId = 'guest') => {
  try {
    const key = getUserKey(LOCAL_STORAGE_KEYS.USER_STATS, userId)
    localStorage.setItem(key, JSON.stringify({
      ...stats,
      lastUpdated: new Date().toISOString()
    }))
    return { success: true, error: null }
  } catch (error) {
    console.error('Error saving user stats locally:', error)
    return { success: false, error }
  }
}

export const getUserStatsLocally = (userId = 'guest') => {
  try {
    const key = getUserKey(LOCAL_STORAGE_KEYS.USER_STATS, userId)
    const stats = localStorage.getItem(key)
    return stats ? JSON.parse(stats) : {
      level: 1,
      totalPoints: 0,
      questsCompleted: 0,
      daysActive: 0,
      currentStreak: 0,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error getting user stats locally:', error)
    return {
      level: 1,
      totalPoints: 0,
      questsCompleted: 0,
      daysActive: 0,
      currentStreak: 0,
      lastUpdated: new Date().toISOString()
    }
  }
}

// Sync helper - for when going from offline to online
export const getAllLocalData = (userId = 'guest') => {
  return {
    events: getEventsLocally(userId),
    rewards: getRewardsLocally(userId),
    stats: getUserStatsLocally(userId)
  }
}

// Clear local data (for logout)
export const clearLocalData = (userId = 'guest') => {
  try {
    Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
      const userKey = getUserKey(key, userId)
      localStorage.removeItem(userKey)
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error clearing local data:', error)
    return { success: false, error }
  }
} 