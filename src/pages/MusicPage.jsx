import { motion } from 'framer-motion'
import { ArrowLeft, Music } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects, sectionInfo } from '../data/projects'

export default function MusicPage() {
  const musicProjects = projects.music
  const sectionData = sectionInfo.music

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
                <Music size={32} />
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
                <strong>Audio Processing:</strong> All music tools prioritize local processing and privacy. 
                Your audio files and creative work stay on your device.
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
              Music Tools ({musicProjects.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Creative applications for music production, analysis, and discovery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {musicProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎼 Music Projects in Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                These innovative music tools are currently in development. They'll combine modern web technologies 
                with audio processing to create powerful, privacy-first music applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/akiyer18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Follow Development
                </a>
                <Link to="/growth" className="btn-outline">
                  Try Live Tools
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 