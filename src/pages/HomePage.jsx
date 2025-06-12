import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, TrendingUp, Music, Bot, Plus, Heart, BookOpen, Zap } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  const scrollToSections = () => {
    document.getElementById('sections').scrollIntoView({ behavior: 'smooth' })
  }

  const sectionCards = [
    {
      key: 'applications',
      title: 'Applications',
      emoji: '🚀',
      description: 'Projects and tools I\'ve built using AI to solve real-world problems and enhance productivity.',
      icon: Zap,
      color: 'from-blue-500 to-purple-600',
      path: '/applications'
    },
    {
      key: 'about',
      title: 'About Me',
      emoji: '👨‍💻',
      description: 'My story, values, and goals as an engineer exploring the intersection of AI and human potential.',
      icon: Heart,
      color: 'from-emerald-500 to-teal-600',
      path: '/about'
    },
    {
      key: 'theory',
      title: 'Theory & Writings',
      emoji: '📚',
      description: 'Personal papers and thoughts on AI, cognition, society, and the future of human-AI collaboration.',
      icon: BookOpen,
      color: 'from-indigo-500 to-purple-600',
      path: '/theory'
    },
    {
      key: 'advanced',
      title: 'Advanced Projects',
      emoji: '🔬',
      description: 'Experimental work, research, and agentic AI frameworks pushing the boundaries of what\'s possible.',
      icon: Bot,
      color: 'from-red-500 to-pink-600',
      path: '/advanced'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            {/* Avatar/Illustration */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-6xl animate-float">
                🚀
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                Akshaye Iyer
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90 font-medium">
              Researcher & Builder | Exploring Agentic AI, LLMs & Human-Centered Innovation
              </p>
              
              <p className="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto text-balance leading-relaxed">
                Building the future through innovative projects that blend artificial intelligence, 
                language understanding, and creative expression. From productivity tools to music 
                applications, each project explores the intersection of technology and human experience.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToSections}
                  className="btn-secondary group"
                >
                  Explore My Work
                  <ChevronDown className="group-hover:translate-y-1 transition-transform duration-300" size={20} />
                </button>
                
                <a
                  href="https://github.com/akiyer18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View GitHub
                  <span className="text-xl">📂</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToSections}
            className="text-white/70 hover:text-white transition-colors duration-300 animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </motion.div>
      </section>

      {/* Main Sections */}
      <section id="sections" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Explore My Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
              From AI-powered applications to theoretical research, discover how I'm building 
              the future through innovative projects that blend technology with human-centered design.
            </p>
          </motion.div>

          {/* Section Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {sectionCards.map((section, index) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => navigate(section.path)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 card-hover group-hover:border-transparent transition-all duration-300">
                  {/* Gradient Border on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} 
                       style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl" />
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {section.emoji} {section.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {section.description}
                  </p>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                      Explore Projects →
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300`}>
                      <ChevronDown size={16} className="rotate-[-90deg]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Section Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-accent-500 dark:hover:border-accent-400 transition-colors duration-300 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Plus size={24} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  More Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  New sections and projects are in development. Stay tuned for updates!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 