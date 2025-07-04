import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, TrendingUp, Music, Bot, Plus, Heart, BookOpen, Zap, ExternalLink, Award } from 'lucide-react'

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
      color: 'from-primary-800 to-accent-600',
      path: '/applications'
    },
    {
      key: 'about',
      title: 'About Me',
      emoji: '👨‍💻',
      description: 'My story, values, and goals as an engineer exploring the intersection of AI and human potential.',
      icon: Heart,
      color: 'from-accent-500 to-accent-700',
      path: '/about'
    },
    {
      key: 'theory',
      title: 'Theory & Writings',
      emoji: '📚',
      description: 'Personal papers and thoughts on AI, cognition, society, and the future of human-AI collaboration.',
      icon: BookOpen,
      color: 'from-primary-700 to-primary-900',
      path: '/theory'
    },
    {
      key: 'advanced',
      title: 'Advanced Projects',
      emoji: '🔬',
      description: 'Experimental work, research, and agentic AI frameworks pushing the boundaries of what\'s possible.',
      icon: Bot,
      color: 'from-accent-600 to-primary-800',
      path: '/advanced'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-sand-100/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent-600/20 to-transparent rounded-full blur-3xl" />
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
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-sand-100/20 backdrop-blur-sm border border-sand-200/30 flex items-center justify-center text-6xl animate-float">
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
              
              <p className="mantra-text mb-8 text-sand-100">
                Engineering meaningful intelligence rooted in logic, ethics, and flow.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

              {/* Featured Project */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="featured-card p-8 text-left">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 flex items-center justify-center text-white text-2xl">
                        🏆
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={20} className="text-accent-600" />
                        <span className="text-sm font-medium text-accent-600 uppercase tracking-wide">Featured Achievement</span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary-800 dark:text-sand-100 mb-3">
                        NASA Space Apps Challenge: Global Nominee & People's Choice
                      </h3>
                      <p className="text-primary-700 dark:text-sand-200 mb-4 leading-relaxed">
                        Developed an AI-based scheduling tool to optimize astronaut sleep cycles based on diet, exercise, and medication data, analyzing 100,000 entries. Featured in The Times of India.
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => navigate('/applications')}
                          className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium transition-colors duration-300"
                        >
                          View Project <ExternalLink size={16} />
                        </button>
                        <div className="text-sm text-primary-600 dark:text-sand-300">
                          🌟 Global Recognition • 📰 Media Coverage
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
            className="text-sand-100/70 hover:text-sand-100 transition-colors duration-300 animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </motion.div>
      </section>

      {/* Main Sections */}
      <section id="sections" className="py-20 transition-colors duration-300">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-800 dark:text-sand-100">
              Explore My Work
            </h2>
            <p className="text-xl text-primary-600 dark:text-sand-300 max-w-3xl mx-auto text-balance">
              From AI-powered applications to theoretical research, discover how I'm building 
              the future through innovative projects that blend technology with human-centered design.
            </p>
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider mb-16"></div>

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
                <div className="bg-sand-50 dark:bg-primary-800 rounded-2xl p-8 shadow-lg border border-primary-200 dark:border-sand-200/20 card-hover group-hover:border-accent-400 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-800 dark:text-sand-100 flex items-center gap-2">
                        {section.emoji} {section.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-primary-600 dark:text-sand-300 leading-relaxed mb-6">
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

          {/* More Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-sand-50 dark:bg-primary-800 rounded-2xl p-8 shadow-lg border-2 border-dashed border-primary-300 dark:border-sand-300/30 hover:border-accent-500 dark:hover:border-accent-400 transition-colors duration-300 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-sand-200 dark:bg-primary-700 flex items-center justify-center">
                  <Plus size={24} className="text-primary-600 dark:text-sand-400" />
                </div>
                <h3 className="text-lg font-semibold text-primary-800 dark:text-sand-100 mb-2">
                  More Coming Soon
                </h3>
                <p className="text-primary-600 dark:text-sand-300 text-sm">
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