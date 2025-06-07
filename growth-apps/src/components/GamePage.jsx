import { useState } from 'react'
import { Link } from 'react-router-dom'

function GamePage() {
  const [rewardPoints, setRewardPoints] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative p-6 bg-black bg-opacity-30 border-b border-white border-opacity-20 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
            🎮 Quest Hub
          </Link>
          
          {/* Reward Points Display */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            💎 Reward Points: {rewardPoints}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-pulse">
            Welcome, Adventurer!
          </h1>
          <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
            Your journey to personal growth starts here. Complete quests, earn rewards, and level up your life!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link 
              to="/tools"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-cyan-500/50"
            >
              <span className="flex items-center gap-3">
                🔍 Open Discovery Tools
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
            
            <Link 
              to="/game/start"
              className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50"
            >
              <span className="flex items-center gap-3">
                ⚡ Start Your Quest
                <span className="group-hover:rotate-12 transition-transform duration-300">🚀</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Game Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { 
              title: 'Daily Quests', 
              icon: '🎯', 
              desc: 'Complete daily challenges and build powerful habits',
              color: 'from-green-400 to-emerald-600',
              points: '+10-50 points'
            },
            { 
              title: 'Level Up System', 
              icon: '⭐', 
              desc: 'Gain XP and unlock new abilities as you progress',
              color: 'from-yellow-400 to-orange-600',
              points: 'Unlock rewards'
            },
            { 
              title: 'Achievement Hunter', 
              icon: '🏆', 
              desc: 'Earn badges and titles for major milestones',
              color: 'from-purple-400 to-indigo-600',
              points: 'Rare rewards'
            },
            { 
              title: 'Social Guilds', 
              icon: '👥', 
              desc: 'Join communities and complete group challenges',
              color: 'from-pink-400 to-rose-600',
              points: 'Bonus XP'
            },
            { 
              title: 'Skill Trees', 
              icon: '🌳', 
              desc: 'Develop different life skills and specializations',
              color: 'from-teal-400 to-cyan-600',
              points: 'Passive bonuses'
            },
            { 
              title: 'Reward Shop', 
              icon: '🛒', 
              desc: 'Spend points on real-world treats and experiences',
              color: 'from-red-400 to-pink-600',
              points: 'Spend points'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl border border-white border-opacity-20 hover:bg-opacity-20 hover:scale-105 transform transition-all duration-500 cursor-pointer"
            >
              <div className="text-6xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{feature.desc}</p>
              <div className={`inline-block bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full font-semibold text-sm`}>
                {feature.points}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Preview */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Your Adventure Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Level', value: '1', icon: '🎖️' },
              { label: 'Quests Completed', value: '0', icon: '✅' },
              { label: 'Days Active', value: '0', icon: '📅' },
              { label: 'Achievement Score', value: '0', icon: '🏅' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 p-6 text-center text-gray-400 border-t border-white border-opacity-10">
        <p className="text-lg">🎮 Ready to transform your life into an epic adventure? 🎮</p>
      </footer>
    </div>
  )
}

export default GamePage 