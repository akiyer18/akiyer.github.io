import { motion } from 'framer-motion'
import { ArrowLeft, Cpu, GitBranch, Zap, Lock, Globe, Database, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdvancedPage() {
  const projectCategories = [
    {
      category: 'Agentic AI Systems',
      description: 'Next-generation AI frameworks for autonomous task execution',
      icon: Bot,
      count: 3,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Distributed Computing',
      description: 'Decentralized networks for collaborative AI processing',
      icon: Globe,
      count: 2,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Privacy Technology',
      description: 'Advanced privacy-preserving AI architectures',
      icon: Lock,
      count: 4,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Cognitive Computing',
      description: 'Human-AI collaboration and augmentation systems',
      icon: Cpu,
      count: 2,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      category: 'Multi-Modal AI',
      description: 'Cross-modal understanding and processing systems',
      icon: Zap,
      count: 3,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      category: 'Knowledge Systems',
      description: 'Advanced information processing and reasoning platforms',
      icon: Database,
      count: 2,
      gradient: 'from-teal-500 to-blue-500'
    }
  ]



  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-pink-600 text-white">
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
                <GitBranch size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  🔬 Advanced Projects
                </h1>
                <p className="text-xl opacity-90">
                  Experimental work, research, and agentic AI frameworks
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white/90">
                <strong>Cutting-Edge Research:</strong> These projects push the boundaries of AI, exploring 
                agentic systems, distributed computing, and novel approaches to human-AI collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Research Categories in Development
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon size={24} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {category.category}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {category.count} projects in development
                      </span>
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}></span>
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

          {/* Research Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Research Focus Areas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Agentic AI Systems',
                  description: 'Building AI agents that can reason, plan, and execute complex tasks autonomously while maintaining human oversight.',
                  icon: '🤖'
                },
                {
                  title: 'Privacy-Preserving AI',
                  description: 'Developing AI systems that provide powerful capabilities while protecting user privacy and data sovereignty.',
                  icon: '🔒'
                },
                {
                  title: 'Human-AI Collaboration',
                  description: 'Exploring optimal patterns for human-AI interaction that augment rather than replace human capabilities.',
                  icon: '🤝'
                }
              ].map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {area.description}
                  </p>
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
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Collaborate on Advanced Research
              </h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                These projects are at the forefront of AI research. If you're interested in collaboration, 
                contributing, or discussing the implications of this work, I'd love to connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:akshaye.iyer@outlook.com?subject=Collaboration on Advanced AI Research"
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300"
                >
                  Propose Collaboration
                </a>
                <Link
                  to="/theory"
                  className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors duration-300"
                >
                  Read Research Papers
                </Link>
                <Link
                  to="/applications"
                  className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors duration-300"
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