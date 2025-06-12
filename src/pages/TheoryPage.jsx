import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Brain, Users, Lightbulb, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TheoryPage() {
  const researchAreas = [
    {
      area: 'AI & Cognition',
      description: 'Exploring the cognitive foundations of artificial intelligence',
      icon: Brain,
      count: 4,
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      area: 'Technology & Society',
      description: 'Examining the societal implications of emerging technologies',
      icon: Users,
      count: 3,
      gradient: 'from-green-500 to-teal-500'
    },
    {
      area: 'AI & Creativity',
      description: 'Understanding the role of AI in creative and artistic processes',
      icon: Lightbulb,
      count: 5,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      area: 'Psychology & Technology',
      description: 'Bridging psychological insights with technological innovation',
      icon: BookOpen,
      count: 3,
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const thoughtCategories = [
    {
      category: 'Philosophical Explorations',
      description: 'Deep questions about consciousness, understanding, and intelligence',
      icon: '🤔',
      count: 6
    },
    {
      category: 'Technical Insights',
      description: 'Practical observations from building AI systems',
      icon: '⚙️',
      count: 8
    },
    {
      category: 'Ethical Considerations',
      description: 'Moral frameworks for responsible AI development',
      icon: '⚖️',
      count: 4
    },
    {
      category: 'Future Perspectives',
      description: 'Visions and predictions for the evolution of AI',
      icon: '🔮',
      count: 5
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-6"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <BookOpen size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  📚 Theory & Writings
                </h1>
                <p className="text-xl opacity-90">
                  Personal papers and thoughts on AI, cognition, society
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white/90">
                <strong>Interdisciplinary Exploration:</strong> These writings explore the intersection of 
                technology, psychology, linguistics, and philosophy to understand our evolving relationship with AI.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Papers */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Research Areas in Development
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-r ${area.gradient} rounded-lg text-white flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300`}>
                      <area.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {area.area}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {area.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${area.gradient}`}></span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {area.count} papers in development
                          </span>
                        </div>
                        
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Thought Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Thought Collections in Development
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {thoughtCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {category.category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {category.count} pieces in development
                      </span>
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Writings & Research Coming Soon
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                I'm currently developing comprehensive writings on AI, cognition, and society. 
                These will explore the deep questions and practical insights from building AI systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:akshaye.iyer@outlook.com?subject=Interest in upcoming writings"
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300"
                >
                  Get Notified
                </a>
                <Link
                  to="/about"
                  className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors duration-300"
                >
                  Learn More About Me
                </Link>
                <Link
                  to="/applications"
                  className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors duration-300"
                >
                  See Current Applications
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 