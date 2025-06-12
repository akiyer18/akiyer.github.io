import { motion } from 'framer-motion'
import { ArrowLeft, Code, Bot, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function ApplicationsPage() {
  const allProjects = [...projects.growth, ...projects.music, ...projects.ai]

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
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
                <Code size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  🚀 Applications
                </h1>
                <p className="text-xl opacity-90">
                  Projects and tools I've built using AI
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white/90">
                <strong>AI-Powered Development:</strong> Each application leverages artificial intelligence 
                to solve real-world problems, enhance productivity, and create meaningful user experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects by Category */}
      <section className="py-16">
        <div className="container-custom">
          {/* Growth Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-green-500" size={32} />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Growth & Productivity Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-enhanced applications for personal and professional growth
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.growth.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Music Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="text-purple-500 text-3xl">🎵</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Music & Creative Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-powered music creation and analysis applications
                </p>
              </div>
            </div>
            {projects.music.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {projects.music.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Innovative music tools are currently in development
                </p>
              </div>
            )}
          </motion.div>

          {/* AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Bot className="text-blue-500" size={32} />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI & Machine Learning Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced AI applications for linguistics, content creation, and analysis
                </p>
              </div>
            </div>
            {projects.ai.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {projects.ai.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Revolutionary AI tools are in active development
                </p>
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Explore the Code Behind the Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                All applications are open-source and available on GitHub. Explore the code, 
                contribute to the projects, or adapt them for your own use cases.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/akiyer18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View GitHub Repository
                </a>
                <Link to="/advanced" className="btn-outline">
                  See Advanced Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 