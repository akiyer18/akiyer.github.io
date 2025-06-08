import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, Copy, Check, Shield, Lock, Cloud, Zap } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  const [showCloneCommand, setShowCloneCommand] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyClone = async () => {
    try {
      await navigator.clipboard.writeText(project.cloneCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case 'Privacy-First':
        return <Shield size={14} />
      case 'Offline Ready':
        return <Lock size={14} />
      case 'Secure by Design':
        return <Shield size={14} />
      case 'Cloud Sync':
        return <Cloud size={14} />
      case 'LLM-Powered':
        return <Zap size={14} />
      case 'API Secure':
        return <Lock size={14} />
      default:
        return <Shield size={14} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'beta':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'development':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'coming-soon':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'research':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'live':
        return 'Live'
      case 'beta':
        return 'Beta'
      case 'development':
        return 'In Development'
      case 'coming-soon':
        return 'Coming Soon'
      case 'research':
        return 'Research'
      default:
        return 'Status Unknown'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 card-hover"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{project.emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Privacy Badge */}
      <div className="mb-4">
        <div className="privacy-badge">
          {getPrivacyIcon(project.privacy)}
          <span>{project.privacy}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {project.securityNote}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 min-w-fit"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1 min-w-fit"
          >
            <Github size={16} />
            View Code
          </a>
        </div>

        {/* Clone Button */}
        <button
          onClick={() => setShowCloneCommand(!showCloneCommand)}
          className="w-full btn-outline justify-center"
        >
          <Eye size={16} />
          {showCloneCommand ? 'Hide Clone Command' : 'Show Clone Command'}
        </button>

        {/* Clone Command */}
        {showCloneCommand && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-mono">Terminal</span>
              <button
                onClick={handleCopyClone}
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <code className="text-green-400 font-mono text-sm block bg-black rounded p-2">
              {project.cloneCommand}
            </code>
            <p className="text-gray-500 text-xs mt-2">
              💡 After cloning, run <code className="text-gray-400">npm install</code> and follow the README for setup instructions.
            </p>
          </motion.div>
        )}
      </div>

      {/* Features (if available) */}
      {project.features && project.features.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Key Features
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
} 