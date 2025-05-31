import { useState } from 'react'
import './style.css'

function App() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
             : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Navigation */}
      <nav className="p-6 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
            AkshCreations
          </h1>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="glass-card-dark px-4 py-2 hover:bg-white/20 transition-all duration-200"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
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
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Expense Tracker', icon: '💰', desc: 'Track your finances' },
            { title: 'Food Planner', icon: '🍽️', desc: 'Plan your meals' },
            { title: 'Gym Routine', icon: '💪', desc: 'Fitness tracking' },
            { title: 'Habit Tracker', icon: '✅', desc: 'Build good habits' }
          ].map((item, index) => (
            <div key={index} className="glass-card-dark p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Projects', desc: 'View my GitHub repositories', icon: '🚀' },
            { title: 'Articles', desc: 'Read my blog posts', icon: '📝' },
            { title: 'Tools', desc: 'Useful utilities and calculators', icon: '🛠️' }
          ].map((section, index) => (
            <div key={index} className="glass-card-dark p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-4">{section.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-gray-300">{section.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 p-6 text-center text-gray-400 border-t border-white/10">
        <p>Built with React + Vite + TailwindCSS</p>
      </footer>
    </div>
  )
}

export default App 