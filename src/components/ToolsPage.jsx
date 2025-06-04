import { Link } from 'react-router-dom'

function ToolsPage() {
  const tools = [
    {
      title: 'Money Mastery',
      description: 'Take control of your finances with smart tracking and budgeting',
      icon: '💰',
      link: '/Money_tracker/',
      gradient: 'from-green-400 to-emerald-600',
      features: ['Dashboard', 'Budgeting', 'Analytics']
    },
    {
      title: 'Meal Planning Pro',
      description: 'Smart meal decisions and automatic grocery lists',
      icon: '🍽️',
      link: '/Meal_decider/',
      gradient: 'from-orange-400 to-red-600',
      features: ['AI Matching', 'Recipe Management', 'Grocery Sync']
    },
    {
      title: 'Study & Schedule Boss',
      description: 'Academic success through smart planning and organization',
      icon: '🎓',
      link: '/Class_study_planner/',
      gradient: 'from-blue-400 to-indigo-600',
      features: ['Timetable Grid', 'Assignment Tracker', 'Study Planning']
    },
    {
      title: 'Smart Shopping',
      description: 'Never forget groceries with organized, intelligent lists',
      icon: '🛒',
      link: '/Grocery_list_generator/',
      gradient: 'from-purple-400 to-pink-600',
      features: ['Dish-Based', 'Categories', 'Export/Import']
    },
    {
      title: 'Calendar Manager',
      description: 'Comprehensive calendar with events and trip planning',
      icon: '📅',
      link: '/Calendar_manager/',
      gradient: 'from-teal-400 to-cyan-600',
      features: ['Recurring Events', 'To-Do Integration', 'Trip Planning']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative p-6 bg-black bg-opacity-30 border-b border-white border-opacity-20 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/game" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
            ← Back to Quest Hub
          </Link>
          
          <Link to="/" className="text-lg text-gray-300 hover:text-white transition-colors duration-300">
            🏠 Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6">
            🔍 Discovery Tools
          </h1>
          <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
            Your arsenal of productivity tools to level up every aspect of your life
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl border border-white border-opacity-20 hover:bg-opacity-20 hover:scale-105 transform transition-all duration-500 cursor-pointer block"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:animate-bounce">{tool.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
                <p className="text-gray-300 leading-relaxed">{tool.description}</p>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.features.map((feature, featureIndex) => (
                  <span 
                    key={featureIndex}
                    className="text-xs bg-white bg-opacity-20 text-white px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* Launch Button */}
              <div className={`bg-gradient-to-r ${tool.gradient} text-white px-6 py-3 rounded-2xl font-bold text-center group-hover:shadow-lg transition-all duration-300`}>
                <span className="flex items-center justify-center gap-2">
                  Launch Tool
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Integration Info */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">🔗 Seamless Integration</h2>
          <p className="text-xl text-gray-300 text-center mb-8">
            All tools work together to create a unified productivity experience
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '📅', text: 'Schedule events & plan trips' },
              { icon: '🍽️', text: 'Plan meals with Meal Decider' },
              { icon: '🛒', text: 'Generate grocery lists automatically' },
              { icon: '📊', text: 'Track expenses in Finance Tracker' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{step.icon}</div>
                <p className="text-gray-300 text-sm">{step.text}</p>
                {index < 3 && (
                  <div className="hidden md:block text-2xl text-purple-400 mt-2">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Level Up Your Life?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with any tool and build your perfect productivity system
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/productivity-tools/"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50"
            >
              <span className="flex items-center gap-3">
                🚀 View All Tools
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </a>
            
            <Link 
              to="/game"
              className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50"
            >
              <span className="flex items-center gap-3">
                🎮 Back to Quest Hub
                <span className="group-hover:rotate-12 transition-transform duration-300">🚀</span>
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 p-6 text-center text-gray-400 border-t border-white border-opacity-10">
        <p className="text-lg">🛠️ Build the life you want, one tool at a time 🛠️</p>
      </footer>
    </div>
  )
}

export default ToolsPage 