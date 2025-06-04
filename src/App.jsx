import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import GamePage from './components/GamePage'
import GameStart from './components/GameStart'
import ToolsPage from './components/ToolsPage'
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
            {/* Game Link */}
            <Link 
              to="/game"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
            >
              🎮 Quest Hub
            </Link>
            
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
            Welcome to My Digital Space
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore my projects, tools, and thoughts in this modern web experience
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/game"
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                🎮 Enter Quest Hub
                <span className="group-hover:rotate-12 transition-transform duration-300">🚀</span>
              </span>
            </Link>
            
            <Link 
              to="/tools"
              className="group bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                🛠️ Discovery Tools
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Expense Tracker', icon: '💰', desc: 'Track your finances', link: '/Money_tracker/' },
            { title: 'Food Planner', icon: '🍽️', desc: 'Plan your meals', link: '/Meal_decider/' },
            { title: 'Gym Routine', icon: '💪', desc: 'Fitness tracking', link: '#' },
            { title: 'Habit Tracker', icon: '✅', desc: 'Build good habits', link: '#' }
          ].map((item, index) => (
            <a 
              key={index} 
              href={item.link}
              className="glass-card-dark p-6 hover:scale-105 transform transition-all duration-300 cursor-pointer block"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </a>
          ))}
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/start" element={<GameStart />} />
        <Route path="/tools" element={<ToolsPage />} />
      </Routes>
    </Router>
  )
}

export default App 