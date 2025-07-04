import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Brain, Users, Lightbulb, ExternalLink, FileText, Zap, Target, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TheoryPage() {
  const researchAreas = [
    {
      area: 'AI & Cognition',
      description: 'Exploring the cognitive foundations of artificial intelligence and consciousness',
      icon: Brain,
      count: 6,
      gradient: 'from-primary-800 to-accent-600',
      papers: ['Emergence of Understanding in Language Models', 'Pattern Recognition vs. True Comprehension', 'The Consciousness Question in AI Systems']
    },
    {
      area: 'Human-AI Collaboration',
      description: 'Designing frameworks for meaningful human-AI interaction and augmentation',
      icon: Users,
      count: 4,
      gradient: 'from-accent-600 to-accent-500',
      papers: ['Augmented Intelligence Paradigms', 'Trust Mechanisms in AI Systems', 'The Psychology of AI Interaction']
    },
    {
      area: 'AI & Creativity',
      description: 'Understanding the role of AI in creative processes and artistic expression',
      icon: Lightbulb,
      count: 5,
      gradient: 'from-primary-700 to-primary-900',
      papers: ['AI as Creative Collaborator', 'Music Generation and Human Creativity', 'The Authenticity Problem in AI Art']
    },
    {
      area: 'Ethical AI Development',
      description: 'Frameworks for responsible AI development and deployment',
      icon: Target,
      count: 3,
      gradient: 'from-accent-500 to-accent-700',
      papers: ['Privacy-First AI Architecture', 'Bias Detection in Language Models', 'AI Governance for Beneficial Outcomes']
    }
  ]

  const featuredWritings = [
    {
      title: 'The Pattern Recognition Paradox',
      category: 'AI Cognition',
      description: 'An exploration of how current language models achieve remarkable pattern recognition while potentially lacking true understanding. This piece examines the philosophical implications of emergent behaviors in AI systems.',
      readTime: '12 min read',
      topics: ['Pattern Recognition', 'Consciousness', 'Language Models', 'Philosophy of Mind'],
      abstract: 'As language models demonstrate increasingly sophisticated responses, we must question whether pattern recognition at scale constitutes understanding or merely creates an illusion of comprehension...',
      status: 'In Development'
    },
    {
      title: 'Musical Intelligence: Harmony Between Human and AI',
      category: 'AI & Creativity',
      description: 'Analyzing how my experience in music composition informs AI development, and how AI tools can enhance rather than replace human creativity in musical expression.',
      readTime: '8 min read',
      topics: ['Music Theory', 'AI Creativity', 'Human-AI Collaboration', 'Pattern Analysis'],
      abstract: 'The mathematical structures underlying music theory provide unique insights into AI architecture, while AI tools offer new possibilities for musical exploration and composition...',
      status: 'In Development'
    },
    {
      title: 'Spatial Intelligence in Football and AI Agent Design',
      category: 'Cognitive Science',
      description: 'How studying football tactics and spatial reasoning translates to designing more effective AI agents and multi-agent systems.',
      readTime: '10 min read',
      topics: ['Spatial Intelligence', 'Multi-agent Systems', 'Strategic Planning', 'Decision Making'],
      abstract: 'The complex spatial relationships and strategic decision-making in football offer valuable frameworks for designing AI agents that must operate in dynamic, multi-agent environments...',
      status: 'In Development'
    }
  ]

  const thoughtCategories = [
    {
      category: 'Philosophical Explorations',
      description: 'Deep questions about consciousness, understanding, and the nature of intelligence',
      icon: '🤔',
      count: 6,
      color: 'primary-600'
    },
    {
      category: 'Technical Insights',
      description: 'Practical observations from building AI systems and real-world applications',
      icon: '⚙️',
      count: 8,
      color: 'accent-600'
    },
    {
      category: 'Ethical Frameworks',
      description: 'Moral considerations and guidelines for responsible AI development',
      icon: '⚖️',
      count: 4,
      color: 'primary-700'
    },
    {
      category: 'Future Perspectives',
      description: 'Visions and predictions for the evolution of AI and human-AI interaction',
      icon: '🔮',
      count: 5,
      color: 'accent-500'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-accent-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sand-100/80 hover:text-sand-100 transition-colors duration-300 mb-6"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-sand-100/20 backdrop-blur-sm rounded-2xl">
                <BookOpen size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  📚 Theory & Writings
                </h1>
                <p className="text-xl opacity-90">
                  Exploring AI, cognition, and the future of intelligence
                </p>
              </div>
            </div>
            
            <div className="bg-sand-100/10 backdrop-blur-sm rounded-lg p-4 border border-sand-100/20">
              <p className="text-sand-100/90">
                <strong>Interdisciplinary Research:</strong> These writings explore the intersection of 
                computer science, cognitive science, linguistics, and philosophy to understand our evolving relationship with artificial intelligence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Writings */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Featured Writings
            </h2>
            <div className="section-divider mb-12"></div>
            
            <div className="space-y-8">
              {featuredWritings.map((writing, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="featured-card p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-primary-800 dark:text-sand-100 mb-2">
                            {writing.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-accent-600 dark:text-accent-400 font-medium">
                              {writing.category}
                            </span>
                            <span className="text-primary-600 dark:text-sand-400">
                              {writing.readTime}
                            </span>
                            <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-xs font-medium">
                              {writing.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-primary-700 dark:text-sand-200 mb-4 leading-relaxed">
                        {writing.description}
                      </p>
                      
                      <div className="bg-sand-100 dark:bg-primary-900/50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-semibold text-primary-800 dark:text-sand-100 mb-2">Abstract</h4>
                        <p className="text-primary-600 dark:text-sand-300 text-sm leading-relaxed italic">
                          {writing.abstract}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {writing.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-sand-300 rounded-full text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 lg:w-48">
                      <div className="bg-gradient-to-br from-primary-800 to-accent-600 rounded-xl p-6 text-white text-center h-full flex flex-col justify-center">
                        <FileText size={32} className="mx-auto mb-3" />
                        <p className="text-sm opacity-90 mb-4">Coming Soon</p>
                        <button className="bg-sand-100/20 hover:bg-sand-100/30 text-sand-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                          Notify Me
                        </button>
                      </div>
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
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Research Focus Areas
            </h2>
            <div className="section-divider mb-12"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-sand-50 dark:bg-primary-800 rounded-2xl p-6 shadow-lg border border-primary-200 dark:border-sand-200/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${area.gradient} text-white`}>
                      <area.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-800 dark:text-sand-100 mb-2">
                        {area.area}
                      </h3>
                      <p className="text-primary-600 dark:text-sand-300 text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary-700 dark:text-sand-200 mb-2">
                      Papers in Development ({area.count})
                    </h4>
                    <ul className="space-y-1">
                      {area.papers.map((paper, paperIndex) => (
                        <li key={paperIndex} className="flex items-center gap-2 text-xs text-primary-600 dark:text-sand-300">
                          <div className="w-1.5 h-1.5 bg-accent-600 rounded-full"></div>
                          {paper}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-primary-100 dark:bg-primary-900/50 rounded-lg p-3">
                    <span className="text-xs font-medium text-primary-600 dark:text-sand-400">
                      Research in Progress
                    </span>
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
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Areas of Exploration
            </h2>
            <div className="section-divider mb-12"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {thoughtCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-sand-50 dark:bg-primary-800 rounded-xl p-6 shadow-lg border border-primary-200 dark:border-sand-200/20 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold text-primary-800 dark:text-sand-100 mb-2">
                    {category.category}
                  </h3>
                  <p className="text-primary-600 dark:text-sand-300 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${category.color}/10 text-${category.color} rounded-full text-xs font-medium`}>
                    <span>{category.count} pieces</span>
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
            <div className="bg-gradient-to-r from-primary-800 to-accent-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Join the Conversation
              </h3>
              <p className="text-sand-100 mb-6 max-w-2xl mx-auto">
                These writings represent ongoing research and evolving thoughts on AI, cognition, and society. 
                I'm building a community around thoughtful AI development and interdisciplinary exploration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:akshaye.iyer@outlook.com?subject=Theory and Research Discussion"
                  className="bg-sand-100 text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-sand-200 transition-colors duration-300"
                >
                  Discuss Research
                </a>
                <a
                  href="https://www.linkedin.com/in/akshaye-iyer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-700 text-sand-100 px-6 py-3 rounded-lg font-semibold hover:bg-accent-800 transition-colors duration-300"
                >
                  Connect on LinkedIn
                </a>
                <Link
                  to="/about"
                  className="bg-accent-700 text-sand-100 px-6 py-3 rounded-lg font-semibold hover:bg-accent-800 transition-colors duration-300"
                >
                  Learn More About Me
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 