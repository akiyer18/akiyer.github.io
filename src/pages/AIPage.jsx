import { motion } from 'framer-motion'
import { ArrowLeft, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects, sectionInfo } from '../data/projects'

export default function AIPage() {
  const aiProjects = projects.ai
  const sectionData = sectionInfo.ai

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className={`py-16 bg-gradient-to-r ${sectionData.color} text-white`}>
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
                <Bot size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {sectionData.emoji} {sectionData.title}
                </h1>
                <p className="text-xl opacity-90">
                  {sectionData.description}
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white/90">
                <strong>AI & Privacy:</strong> All AI tools are designed with privacy in mind. 
                Local processing where possible, encrypted communications, and minimal data retention.
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              AI Applications ({aiProjects.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Intelligent tools leveraging LLMs, natural language processing, and machine learning.
            </p>
          </motion.div>

          {aiProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {aiProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            /* Upcoming Projects Message */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white text-4xl">
                    🤖
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Projects Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                    Revolutionary AI projects are in active development! These cutting-edge tools will leverage 
                    the latest in artificial intelligence, natural language processing, and machine learning.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="text-3xl mb-3">🧠</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Assistant</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered personal assistant with context awareness</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="text-3xl mb-3">✍️</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Creator</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Intelligent content generation and optimization</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="text-3xl mb-3">🔍</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Language Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced linguistic and sentiment processing</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-8">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">🔬 Research Focus</div>
                      <div className="text-gray-600 dark:text-gray-300">Linguistics, NLP, and human-AI interaction</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">🛡️ Privacy First</div>
                      <div className="text-gray-600 dark:text-gray-300">Local processing and encrypted communications</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Practical Impact</div>
                      <div className="text-gray-600 dark:text-gray-300">Real-world applications for everyday problems</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/akiyer18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Follow Research
                  </a>
                  <Link to="/growth" className="btn-outline">
                    Try Live Tools
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Research & Development Notice - Only show if there ARE projects */}
          {aiProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🧠 AI Research & Development
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  These AI tools represent cutting-edge research in natural language processing, 
                  linguistics, and machine learning. Each project explores new ways to make AI 
                  more accessible, private, and useful.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">🔬 Research Focus</div>
                    <div className="text-gray-600 dark:text-gray-300">Linguistics, NLP, and human-AI interaction</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">🛡️ Privacy First</div>
                    <div className="text-gray-600 dark:text-gray-300">Local processing and encrypted communications</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Practical Impact</div>
                    <div className="text-gray-600 dark:text-gray-300">Real-world applications for everyday problems</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/akiyer18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Follow Research
                  </a>
                  <Link to="/growth" className="btn-outline">
                    Try Live Tools
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
} 