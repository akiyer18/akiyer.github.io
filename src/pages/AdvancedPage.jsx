import { motion } from 'framer-motion'
import { ArrowLeft, GitBranch, Cpu, Shield, Network, Brain, Eye, Zap, Target, Globe, Lock, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdvancedPage() {
  const experimentalProjects = [
    {
      title: 'Agentic AI Framework',
      status: 'Active Development',
      category: 'Core Research',
      description: 'Building autonomous AI agents capable of complex reasoning, planning, and execution while maintaining human oversight and ethical boundaries.',
      features: [
        'Multi-modal reasoning capabilities',
        'Dynamic task planning and execution',
        'Human-in-the-loop validation systems',
        'Transparent decision-making processes'
      ],
      technologies: ['Python', 'LangChain', 'PyTorch', 'FastAPI', 'Redis'],
      challenges: ['Maintaining transparency in complex reasoning', 'Balancing autonomy with human control', 'Ensuring ethical decision-making'],
      applications: ['Research automation', 'Complex data analysis', 'Strategic planning assistance'],
      icon: Brain,
      gradient: 'from-primary-800 to-accent-600'
    },
    {
      title: 'Privacy-Preserving AI Architecture',
      status: 'Research Phase',
      category: 'Security & Privacy',
      description: 'Developing AI systems that provide powerful capabilities while protecting user privacy through federated learning and differential privacy techniques.',
      features: [
        'Local model training and inference',
        'Encrypted inter-model communication',
        'Zero-knowledge proof integration',
        'Differential privacy mechanisms'
      ],
      technologies: ['TensorFlow', 'PySyft', 'Cryptography', 'WebAssembly', 'Rust'],
      challenges: ['Maintaining model performance with privacy constraints', 'Secure multi-party computation', 'User experience with privacy-first design'],
      applications: ['Healthcare AI', 'Financial modeling', 'Personal assistants'],
      icon: Shield,
      gradient: 'from-accent-600 to-accent-500'
    },
    {
      title: 'Distributed Cognitive Computing',
      status: 'Conceptual Design',
      category: 'Infrastructure',
      description: 'Exploring distributed computing paradigms that mirror human cognitive processes for more efficient and resilient AI systems.',
      features: [
        'Hierarchical information processing',
        'Attention-based resource allocation',
        'Memory consolidation mechanisms',
        'Fault-tolerant cognitive architectures'
      ],
      technologies: ['Kubernetes', 'Apache Kafka', 'Neo4j', 'Ray', 'IPFS'],
      challenges: ['Coordinating distributed cognitive processes', 'Managing cognitive load distribution', 'Maintaining consistency across nodes'],
      applications: ['Large-scale reasoning', 'Real-time decision systems', 'Collaborative AI networks'],
      icon: Network,
      gradient: 'from-primary-700 to-primary-900'
    }
  ]

  const researchAreas = [
    {
      title: 'Cognitive Architecture Research',
      description: 'Studying how to build AI systems that mirror human cognitive processes',
      icon: Brain,
      count: 3,
      focus: ['Working memory models', 'Attention mechanisms', 'Hierarchical processing']
    },
    {
      title: 'Human-AI Interaction Design',
      description: 'Developing interfaces and protocols for seamless human-AI collaboration',
      icon: Users,
      count: 4,
      focus: ['Trust calibration', 'Explanation generation', 'Collaborative workflows']
    },
    {
      title: 'Privacy-Preserving Intelligence',
      description: 'Creating AI systems that respect privacy while maintaining functionality',
      icon: Lock,
      count: 2,
      focus: ['Federated learning', 'Differential privacy', 'Secure computation']
    },
    {
      title: 'Distributed AI Systems',
      description: 'Building resilient, scalable AI architectures for complex problems',
      icon: Globe,
      count: 2,
      focus: ['Consensus mechanisms', 'Load balancing', 'Fault tolerance']
    }
  ]

  const methodologies = [
    {
      title: 'Interdisciplinary Approach',
      description: 'Combining insights from cognitive science, linguistics, and computer science',
      icon: '🧠',
      examples: ['Music theory → Neural architectures', 'Football tactics → Multi-agent coordination', 'Linguistic analysis → Language model design']
    },
    {
      title: 'Ethical-First Design',
      description: 'Building ethical considerations into the core architecture from day one',
      icon: '⚖️',
      examples: ['Transparent decision trees', 'Bias detection mechanisms', 'Human oversight protocols']
    },
    {
      title: 'Privacy by Design',
      description: 'Ensuring privacy and security are fundamental, not afterthoughts',
      icon: '🔒',
      examples: ['Local-first processing', 'Encrypted communications', 'Minimal data retention']
    },
    {
      title: 'Human-Centric Evaluation',
      description: 'Measuring success by human benefit, not just technical metrics',
      icon: '❤️',
      examples: ['User experience studies', 'Real-world impact assessment', 'Accessibility testing']
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-primary-800 text-white">
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
                <GitBranch size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  🔬 Advanced Projects
                </h1>
                <p className="text-xl opacity-90">
                  Experimental research and agentic AI frameworks
                </p>
              </div>
            </div>
            
            <div className="bg-sand-100/10 backdrop-blur-sm rounded-lg p-4 border border-sand-100/20">
              <p className="text-sand-100/90">
                <strong>Cutting-Edge Research:</strong> These projects push the boundaries of AI, exploring 
                agentic systems, privacy-preserving architectures, and novel approaches to human-AI collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experimental Projects */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Current Experimental Projects
            </h2>
            <div className="section-divider mb-12"></div>
            
            <div className="space-y-8">
              {experimentalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="featured-card p-8"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Project Header & Description */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white`}>
                          <project.icon size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-primary-800 dark:text-sand-100">
                              {project.title}
                            </h3>
                            <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-xs font-medium">
                              {project.status}
                            </span>
                          </div>
                          <p className="text-accent-600 dark:text-accent-400 font-medium text-sm">
                            {project.category}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-primary-700 dark:text-sand-200 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-primary-800 dark:text-sand-100 mb-3">Key Features</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {project.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                              <span className="text-primary-600 dark:text-sand-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-primary-700 dark:text-sand-200 mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-sand-300 rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Details Sidebar */}
                    <div className="lg:w-80 space-y-6">
                      {/* Research Challenges */}
                      <div className="bg-sand-100 dark:bg-primary-900/50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-primary-800 dark:text-sand-100 mb-3">Research Challenges</h4>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, challengeIndex) => (
                            <li key={challengeIndex} className="text-xs text-primary-600 dark:text-sand-300 leading-relaxed">
                              • {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Applications */}
                      <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-primary-800 dark:text-sand-100 mb-3">Potential Applications</h4>
                        <ul className="space-y-2">
                          {project.applications.map((app, appIndex) => (
                            <li key={appIndex} className="text-xs text-primary-600 dark:text-sand-300 leading-relaxed">
                              • {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Research Focus Areas */}
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
                  className="bg-sand-50 dark:bg-primary-800 rounded-2xl p-6 shadow-lg border border-primary-200 dark:border-sand-200/20"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-accent-600 to-accent-500 rounded-lg text-white">
                      <area.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-800 dark:text-sand-100 mb-2">
                        {area.title}
                      </h3>
                      <p className="text-primary-600 dark:text-sand-300 text-sm leading-relaxed mb-3">
                        {area.description}
                      </p>
                      <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">
                        {area.count} active projects
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-primary-700 dark:text-sand-200">Current Focus</h4>
                    {area.focus.map((focus, focusIndex) => (
                      <div key={focusIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent-600 rounded-full"></div>
                        <span className="text-xs text-primary-600 dark:text-sand-300">{focus}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Research Methodologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Research Methodologies
            </h2>
            <div className="section-divider mb-12"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {methodologies.map((methodology, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-sand-50 dark:bg-primary-800 rounded-xl p-6 shadow-lg border border-primary-200 dark:border-sand-200/20"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{methodology.icon}</div>
                    <h3 className="text-lg font-bold text-primary-800 dark:text-sand-100 mb-2">
                      {methodology.title}
                    </h3>
                    <p className="text-primary-600 dark:text-sand-300 text-sm leading-relaxed">
                      {methodology.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-primary-700 dark:text-sand-200">Examples</h4>
                    {methodology.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2"></div>
                        <span className="text-xs text-primary-600 dark:text-sand-300 leading-relaxed">{example}</span>
                      </div>
                    ))}
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
            <div className="bg-gradient-to-r from-accent-600 to-primary-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Collaborate on Advanced Research
              </h3>
              <p className="text-sand-100 mb-6 max-w-2xl mx-auto">
                These experimental projects represent the frontier of AI research. I'm always interested in 
                collaborating with fellow researchers, discussing novel approaches, and exploring new possibilities 
                in artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:akshaye.iyer@outlook.com?subject=Advanced AI Research Collaboration"
                  className="bg-sand-100 text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-sand-200 transition-colors duration-300"
                >
                  Discuss Research
                </a>
                <a
                  href="https://github.com/akiyer18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-700 text-sand-100 px-6 py-3 rounded-lg font-semibold hover:bg-accent-800 transition-colors duration-300"
                >
                  View GitHub
                </a>
                <Link
                  to="/theory"
                  className="bg-accent-700 text-sand-100 px-6 py-3 rounded-lg font-semibold hover:bg-accent-800 transition-colors duration-300"
                >
                  Read My Papers
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 