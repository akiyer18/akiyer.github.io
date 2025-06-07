import { Link } from 'react-router-dom'

function ToolsPage() {
  const productivityTools = [
    {
      title: 'Money Mastery',
      description: 'Privacy-first financial tracking and budgeting',
      icon: '💰',
      link: '/money-mastery',
      gradient: 'from-green-400 to-emerald-600',
      features: ['Privacy First', 'Expense Tracking', 'CSV Export'],
      isInternal: true
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
      link: '/calendar',
      gradient: 'from-teal-400 to-cyan-600',
      features: ['Recurring Events', 'To-Do Integration', 'Trip Planning'],
      isInternal: true
    }
  ]

  const musicProjects = [
    {
      title: 'Beat Maker Studio',
      description: 'Create and produce beats with intuitive tools',
      icon: '🎵',
      link: '#',
      gradient: 'from-pink-400 to-rose-600',
      features: ['Beat Creation', 'Sound Library', 'Export Options'],
      status: 'Coming Soon'
    },
    {
      title: 'Song Analyzer',
      description: 'Analyze your favorite songs and discover patterns',
      icon: '🎤',
      link: '#',
      gradient: 'from-violet-400 to-purple-600',
      features: ['Audio Analysis', 'Pattern Detection', 'Visualization'],
      status: 'Coming Soon'
    },
    {
      title: 'Playlist Generator',
      description: 'AI-powered playlist creation based on mood and activity',
      icon: '🎧',
      link: '#',
      gradient: 'from-indigo-400 to-blue-600',
      features: ['Mood Detection', 'Activity Matching', 'Spotify Integration'],
      status: 'Coming Soon'
    }
  ]

  const aiTools = [
    {
      title: 'Smart Assistant',
      description: 'AI-powered personal assistant for daily tasks',
      icon: '🤖',
      link: '#',
      gradient: 'from-cyan-400 to-blue-600',
      features: ['Task Management', 'Smart Scheduling', 'Natural Language'],
      status: 'Coming Soon'
    },
    {
      title: 'Content Creator',
      description: 'Generate and optimize content with AI assistance',
      icon: '✍️',
      link: '#',
      gradient: 'from-emerald-400 to-green-600',
      features: ['Content Generation', 'Optimization', 'Multi-Platform'],
      status: 'Coming Soon'
    },
    {
      title: 'Decision Maker',
      description: 'AI-powered decision support and analysis',
      icon: '🧠',
      link: '#',
      gradient: 'from-amber-400 to-orange-600',
      features: ['Decision Trees', 'Pro/Con Analysis', 'Risk Assessment'],
      status: 'Coming Soon'
    }
  ]

  const renderToolCard = (tool, index) => (
    <div
      key={index}
      className="group bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl border border-white border-opacity-20 hover:bg-opacity-20 hover:scale-105 transform transition-all duration-500 cursor-pointer relative"
    >
      {tool.status && (
        <div className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1 text-xs text-yellow-300">
          {tool.status}
        </div>
      )}
      
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
      {tool.status ? (
        <div className="bg-gray-500 text-white px-6 py-3 rounded-2xl font-bold text-center opacity-50">
          <span>{tool.status}</span>
        </div>
      ) : tool.isInternal ? (
        <Link 
          to={tool.link} 
          className={`bg-gradient-to-r ${tool.gradient} text-white px-6 py-3 rounded-2xl font-bold text-center group-hover:shadow-lg transition-all duration-300 block`}
        >
          <span className="flex items-center justify-center gap-2">
            Launch Tool
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </Link>
      ) : (
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gradient-to-r ${tool.gradient} text-white px-6 py-3 rounded-2xl font-bold text-center group-hover:shadow-lg transition-all duration-300 block`}
        >
          <span className="flex items-center justify-center gap-2">
            Launch Tool
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </a>
      )}
    </div>
  )

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
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
            ← Back to Home
          </Link>
          
          <Link to="/game" className="text-lg text-gray-300 hover:text-white transition-colors duration-300">
            🎮 Quest Hub
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6">
            🚀 Productivity Universe
          </h1>
          <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
            Your complete toolkit for productivity, creativity, and life optimization
          </p>
        </div>

        {/* Productivity Apps Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            📱 Productivity Apps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productivityTools.map(renderToolCard)}
          </div>
        </section>

        {/* Music Projects Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            🎵 Music Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicProjects.map(renderToolCard)}
          </div>
        </section>

        {/* AI Tools Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            🤖 AI Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTools.map(renderToolCard)}
          </div>
        </section>

        {/* Integration Info */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">🔗 Seamless Integration</h2>
          <p className="text-xl text-gray-300 text-center mb-8">
            All tools work together to create a unified productivity and creative experience
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '📊', text: 'Track your progress across all tools' },
              { icon: '🎯', text: 'Set goals and achieve them systematically' },
              { icon: '🔄', text: 'Sync data between apps seamlessly' },
              { icon: '🚀', text: 'Boost productivity with AI assistance' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{step.icon}</div>
                <p className="text-gray-300 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with any tool and build your perfect productivity ecosystem
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/money-mastery"
              className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-green-500/50"
            >
              <span className="flex items-center gap-3">
                💰 Try Money Mastery
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
            
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