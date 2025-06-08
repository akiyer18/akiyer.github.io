import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects, sectionInfo } from '../data/projects'

export default function GrowthPage() {
  const growthProjects = projects.growth
  const sectionData = sectionInfo.growth

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
                <TrendingUp size={32} />
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
                <strong>Privacy First:</strong> All tools are designed with your privacy in mind. 
                Most work completely offline, and those that don't store minimal data with full transparency.
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
              Available Tools ({growthProjects.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Production-ready applications designed to boost productivity and personal growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {growthProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Boost Your Productivity?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Each tool is carefully crafted to solve real problems while respecting your privacy. 
                Clone any project, customize it to your needs, and make it truly yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/akiyer18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View All Repositories
                </a>
                <Link to="/" className="btn-outline">
                  Explore Other Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 