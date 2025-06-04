import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import GamePage from './components/GamePage'
import GameStart from './components/GameStart'
import ToolsPage from './components/ToolsPage'
import Login from './components/Login'
import MoneyMasteryPage from './components/MoneyMasteryPage'
import './style.css'

function HomePage() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800' 
             : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Navigation */}
      <nav className="p-6 bg-black bg-opacity-20 border-b border-white border-opacity-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-accent">
            AkshCreations
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Login/Account Section */}
            <div className="flex items-center gap-3">
              <Link 
                to="/calendar"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-300"
              >
                🔐 Login
              </Link>
              <button 
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  localStorage.setItem('guestMode', 'true')
                  alert('Guest mode activated! Your data will be stored locally.')
                }}
              >
                👤 Guest Mode
              </button>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="glass-card-dark px-4 py-2 hover:bg-white hover:bg-opacity-20 transition-all duration-200 text-white"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h2 className="text-5xl font-bold text-white mb-6">
            Own Your Day: Build the Life You Want
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your personal life gamification toolkit. Track habits, earn rewards, and design the day that works for you—your way.
          </p>
          
          {/* Inspirational Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8 max-w-3xl mx-auto">
            <p className="text-lg text-white/90 italic mb-3">
              "The main rule is: there are no rules. You make your own."
            </p>
            <p className="text-white/70">— Your Life Game</p>
          </div>
          
          {/* Two Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              to="/game"
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white/20"
            >
              <span className="flex items-center justify-center gap-3">
                ▶ Start Your Game
                <span className="group-hover:rotate-12 transition-transform duration-300">🎮</span>
              </span>
            </Link>
            
            <Link 
              to="/tools"
              className="group bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white/20"
            >
              <span className="flex items-center justify-center gap-3">
                🛠️ Productivity Apps
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>

          {/* Additional Action Button */}
          <div className="mb-8">
            <a 
              href="#"
              onClick={() => {
                document.getElementById('reset-section').scrollIntoView({ behavior: 'smooth' })
              }}
              className="group bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 inline-block"
            >
              <span className="flex items-center gap-3">
                🚀 🌿 Reset All Data
              </span>
            </a>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Quest Calendar', icon: '📅', desc: 'Gamified task management', link: '/calendar' },
            { title: 'Money Mastery', icon: '💰', desc: 'Privacy-first expense tracking', link: '/money-mastery' },
            { title: 'Food Planner', icon: '🍽️', desc: 'Plan your meals', link: '/Meal_decider/' },
            { title: 'Habit Tracker', icon: '✅', desc: 'Build good habits', link: '#' }
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.link.startsWith('/') && !item.link.includes('_') ? item.link : '#'}
              onClick={item.link.includes('_') ? () => window.location.href = item.link : undefined}
              className="glass-card-dark p-6 hover:scale-105 transform transition-all duration-300 cursor-pointer block"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Reset Section */}
        <div id="reset-section" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🔄 Fresh Start</h3>
            <p className="text-white/70 mb-6">
              Ready to reset your progress and start fresh? Click below to clear all local data.
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                  localStorage.clear()
                  window.location.reload()
                }
              }}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
            >
              🗑️ Reset All Data
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Projects', desc: 'View my GitHub repositories', icon: '🚀', link: 'https://github.com/akiyer18' },
            { title: 'Articles', desc: 'Read my blog posts', icon: '📝', link: '#' },
            { title: 'Tools', desc: 'Useful utilities and calculators', icon: '🛠️', link: '/tools' }
          ].map((section, index) => (
            <a 
              key={index} 
              href={section.link}
              target={section.link.startsWith('http') ? '_blank' : '_self'}
              rel={section.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="glass-card-dark p-8 text-center hover:scale-105 transform transition-all duration-300 cursor-pointer block"
            >
              <div className="text-5xl mb-4">{section.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-gray-300">{section.desc}</p>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 p-6 text-center text-gray-400 border-t border-white border-opacity-10">
        <p>Built with React + Vite + TailwindCSS v3</p>
      </footer>
    </div>
  )
}

// Calendar Page Component (placeholder for now)
function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">📅 Quest Calendar</h1>
          <p className="text-white/70 text-lg">
            Gamified calendar with points, achievements, and productivity tracking
          </p>
        </div>

        {/* Login Component */}
        <div className="max-w-md mx-auto">
          <Login />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">Quest System</h3>
            <p className="text-white/70 text-sm">Turn tasks into quests and earn points for completion</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Streak Tracking</h3>
            <p className="text-white/70 text-sm">Build consistency with daily streaks and achievements</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-white font-semibold mb-2">Level Up</h3>
            <p className="text-white/70 text-sm">Gain experience points and unlock new achievements</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/start" element={<GameStart />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/money-mastery" element={<MoneyMasteryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App 