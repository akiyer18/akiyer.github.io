import { supabase, isSupabaseConfigured } from './supabaseClient'
import { 
  saveEventsLocally, 
  getEventsLocally, 
  saveUserStatsLocally, 
  getUserStatsLocally 
} from '../utils/localStorageFallback'

// Event types for gamification
export const EVENT_TYPES = {
  QUEST: 'quest',         // Daily habits/tasks - earns points when completed
  APPOINTMENT: 'appointment', // Meetings, doctors, etc. - no points
  MILESTONE: 'milestone',     // Goals, deadlines - bonus points
  TRIP: 'trip',           // Multi-day events - special rewards
  HABIT: 'habit'          // Recurring daily habits - streak bonuses
}

// Point values for different event types
export const POINT_VALUES = {
  [EVENT_TYPES.QUEST]: 15,
  [EVENT_TYPES.APPOINTMENT]: 5, // Small reward for showing up
  [EVENT_TYPES.MILESTONE]: 50,
  [EVENT_TYPES.TRIP]: 25,
  [EVENT_TYPES.HABIT]: 10
}

// Create new event
export const createEvent = async (eventData, userId) => {
  const event = {
    id: crypto.randomUUID(),
    user_id: userId,
    title: eventData.title,
    description: eventData.description || '',
    start_time: eventData.startTime,
    end_time: eventData.endTime,
    event_type: eventData.eventType || EVENT_TYPES.QUEST,
    repeat_pattern: eventData.repeatPattern || null,
    points_value: eventData.pointsValue || POINT_VALUES[eventData.eventType] || 10,
    completed: false,
    tags: eventData.tags || [],
    created_at: new Date().toISOString()
  }

  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()

      if (error) throw error
      return { data: data[0], error: null }
    } else {
      // Fallback to localStorage
      const existingEvents = getEventsLocally(userId)
      const updatedEvents = [...existingEvents, event]
      const { success, error } = saveEventsLocally(updatedEvents, userId)
      
      if (!success) throw new Error(error)
      return { data: event, error: null }
    }
  } catch (error) {
    console.error('Error creating event:', error)
    return { data: null, error: error.message }
  }
}

// Get all events for user
export const getUserEvents = async (userId) => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', userId)
        .order('start_time', { ascending: true })

      if (error) throw error
      return { data: data || [], error: null }
    } else {
      // Fallback to localStorage
      const events = getEventsLocally(userId)
      return { data: events, error: null }
    }
  } catch (error) {
    console.error('Error getting events:', error)
    // Fallback to localStorage on error
    const events = getEventsLocally(userId)
    return { data: events, error: error.message }
  }
}

// Complete an event (earn points)
export const completeEvent = async (eventId, userId) => {
  try {
    if (isSupabaseConfigured()) {
      // Update event as completed
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq('id', eventId)
        .eq('user_id', userId)
        .select()

      if (eventError) throw eventError

      const event = eventData[0]
      if (!event) throw new Error('Event not found')

      // Award points
      await awardPoints(userId, event.points_value, `Completed: ${event.title}`)
      
      return { data: event, error: null }
    } else {
      // Fallback to localStorage
      const events = getEventsLocally(userId)
      const eventIndex = events.findIndex(e => e.id === eventId)
      
      if (eventIndex === -1) throw new Error('Event not found')
      
      events[eventIndex].completed = true
      events[eventIndex].completed_at = new Date().toISOString()
      
      const { success, error } = saveEventsLocally(events, userId)
      if (!success) throw new Error(error)

      // Award points locally
      await awardPointsLocally(userId, events[eventIndex].points_value)
      
      return { data: events[eventIndex], error: null }
    }
  } catch (error) {
    console.error('Error completing event:', error)
    return { data: null, error: error.message }
  }
}

// Award points helper function
const awardPoints = async (userId, points, description) => {
  try {
    if (isSupabaseConfigured()) {
      // Create reward entry
      const { error: rewardError } = await supabase
        .from('rewards')
        .insert([{
          user_id: userId,
          title: 'Event Completed',
          description,
          points,
          earned_at: new Date().toISOString()
        }])

      if (rewardError) throw rewardError
    }
  } catch (error) {
    console.error('Error awarding points:', error)
  }
}

// Award points locally
const awardPointsLocally = async (userId, points) => {
  try {
    const stats = getUserStatsLocally(userId)
    stats.totalPoints += points
    stats.questsCompleted += 1
    
    // Level up calculation (every 100 points = 1 level)
    const newLevel = Math.floor(stats.totalPoints / 100) + 1
    if (newLevel > stats.level) {
      stats.level = newLevel
    }

    saveUserStatsLocally(stats, userId)
  } catch (error) {
    console.error('Error awarding points locally:', error)
  }
}

// Delete event
export const deleteEvent = async (eventId, userId) => {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)
        .eq('user_id', userId)

      if (error) throw error
      return { success: true, error: null }
    } else {
      // Fallback to localStorage
      const events = getEventsLocally(userId)
      const filteredEvents = events.filter(e => e.id !== eventId)
      const { success, error } = saveEventsLocally(filteredEvents, userId)
      
      return { success, error }
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    return { success: false, error: error.message }
  }
}

// Get events for specific date range
export const getEventsInRange = async (startDate, endDate, userId) => {
  try {
    const { data: events, error } = await getUserEvents(userId)
    
    if (error) throw new Error(error)

    const filteredEvents = events.filter(event => {
      const eventStart = new Date(event.start_time)
      const rangeStart = new Date(startDate)
      const rangeEnd = new Date(endDate)
      
      return eventStart >= rangeStart && eventStart <= rangeEnd
    })

    return { data: filteredEvents, error: null }
  } catch (error) {
    console.error('Error getting events in range:', error)
    return { data: [], error: error.message }
  }
}

// Generate recurring events
export const generateRecurringEvents = (baseEvent, pattern, endDate) => {
  const events = []
  const startDate = new Date(baseEvent.start_time)
  const end = new Date(endDate)
  
  let currentDate = new Date(startDate)
  
  while (currentDate <= end) {
    const event = {
      ...baseEvent,
      id: crypto.randomUUID(),
      start_time: currentDate.toISOString(),
      end_time: new Date(currentDate.getTime() + (new Date(baseEvent.end_time) - new Date(baseEvent.start_time))).toISOString()
    }
    
    events.push(event)
    
    // Calculate next occurrence based on pattern
    switch (pattern) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + 1)
        break
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7)
        break
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + 1)
        break
      default:
        return events // Invalid pattern, return single event
    }
  }
  
  return events
} 