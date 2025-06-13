import { motion } from 'framer-motion'
import { ArrowLeft, Bot, Zap, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCategorySection from '../components/ProjectCategorySection'
import { projects, sectionInfo } from '../data/projects'

export default function ApplicationsPage() {
  // Only show released tools (status 'live' or 'beta')
  const releasedGrowth = projects.growth.filter(p => p.status === 'live' || p.status === 'beta')
  const releasedMusic = projects.music.filter(p => p.status === 'live' || p.status === 'beta')
  const releasedAI = projects.ai.filter(p => p.status === 'live' || p.status === 'beta')

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
                <Palette size={32} />
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
            <div className="flex gap-4 mt-6">
              <a href="#ai-tools" className="btn-outline text-white/90">🎨 AI Tools</a>
              <a href="#productivity-tools" className="btn-outline text-white/90">⚡ Productivity Tools</a>
              <a href="#music-tools" className="btn-outline text-white/90">🎵 Music Tools</a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 mt-6">
              <p className="text-white/90">
                <strong>AI-Powered Development:</strong> Each application leverages artificial intelligence 
                to solve real-world problems, enhance productivity, and create meaningful user experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Categories */}
      <div className="container-custom">
        <ProjectCategorySection
          id="ai-tools"
          icon={<Bot size={28} />}
          title="AI Tools"
          description={sectionInfo.ai.description}
          projects={releasedAI}
          color={sectionInfo.ai.color}
        />
        <ProjectCategorySection
          id="productivity-tools"
          icon={<Zap size={28} />}
          title="Productivity Tools"
          description={sectionInfo.growth.description}
          projects={releasedGrowth}
          color={sectionInfo.growth.color}
        />
        <ProjectCategorySection
          id="music-tools"
          icon={<span className="text-2xl">🎵</span>}
          title="Music Tools"
          description={sectionInfo.music.description}
          projects={releasedMusic}
          color={sectionInfo.music.color}
        />
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16"
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
  )
} 