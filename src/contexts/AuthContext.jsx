import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured, getCurrentUser } from '../services/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(isSupabaseConfigured())

  useEffect(() => {
    // Check if user is logged in when component mounts
    const checkUser = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { user } = await getCurrentUser()
          setUser(user)
        } else {
          // Fallback to guest mode
          setUser({
            id: 'guest',
            email: 'guest@example.com',
            user_metadata: { full_name: 'Guest User' },
            isGuest: true
          })
        }
      } catch (error) {
        console.error('Error checking user:', error)
        // Fallback to guest mode on error
        setUser({
          id: 'guest',
          email: 'guest@example.com', 
          user_metadata: { full_name: 'Guest User' },
          isGuest: true
        })
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Set up auth state listener if Supabase is configured
    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [])

  // Network status listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const signIn = async (provider = 'google') => {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Using guest mode.')
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/game`
        }
      })

      if (error) throw error
      return { success: true, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      if (isSupabaseConfigured() && !user?.isGuest) {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      }
      
      // Switch to guest mode
      setUser({
        id: 'guest',
        email: 'guest@example.com',
        user_metadata: { full_name: 'Guest User' },
        isGuest: true
      })
      
      return { success: true, error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    isOnline,
    isGuest: user?.isGuest || false,
    isSupabaseConfigured: isSupabaseConfigured(),
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 