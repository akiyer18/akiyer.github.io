import { Link } from 'react-router-dom'

function GameStart() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-ping delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative p-6 bg-black bg-opacity-40 border-b border-white border-opacity-20 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/game" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
            ← Back to Quest Hub
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto p-6 text-center">
        <div className="py-20">
          {/* Coming Soon Badge */}
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold text-lg mb-8 animate-bounce">
            🚀 Coming Soon!
          </div>

          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-8 animate-pulse">
            Quest Arena
          </h1>
          
          <p className="text-3xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
            The ultimate gamified life experience is in development!
          </p>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Epic Quest System',
                desc: 'Turn your daily tasks into thrilling adventures with XP rewards, level progression, and achievement unlocks.',
                icon: '⚔️',
                status: 'In Development'
              },
              {
                title: 'Real Reward Store',
                desc: 'Spend earned points on actual treats, experiences, and rewards you define for yourself.',
                icon: '🏪',
                status: 'Designing'
              },
              {
                title: 'Social Challenges',
                desc: 'Team up with friends, join guilds, and compete in community-wide productivity challenges.',
                icon: '👥',
                status: 'Planning'
              },
              {
                title: 'Smart Analytics',
                desc: 'Track your progress with beautiful charts, insights, and personalized recommendations.',
                icon: '📊',
                status: 'Researching'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl border border-white border-opacity-20 hover:bg-opacity-20 transform hover:scale-105 transition-all duration-500"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{feature.desc}</p>
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                  {feature.status}
                </div>
              </div>
            ))}
          </div>

          {/* Notify Me Section */}
          <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-3xl p-12 border border-white border-opacity-20 mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Be the First to Play!</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our early access list and get notified when the Quest Arena launches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-6 py-4 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Notify Me! 🔔
              </button>
            </div>
          </div>

          {/* Back to Current Tools */}
          <div>
            <p className="text-xl text-gray-300 mb-6">
              While you wait, explore our current productivity tools:
            </p>
            <Link 
              to="/tools"
              className="group bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-green-500/50 inline-flex items-center gap-3"
            >
              🛠️ Explore Current Tools
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GameStart 