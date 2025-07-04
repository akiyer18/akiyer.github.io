import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Target, Compass, Book, Code2, Music, Brain, Lightbulb, Shield, User, Headphones, Activity, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Ethical Innovation',
      description: 'Building technology that serves humanity responsibly and with integrity. Every system I create prioritizes user welfare, privacy, and societal benefit over profit or convenience.'
    },
    {
      icon: Brain,
      title: 'Deep Exploration',
      description: 'A commitment to understanding underlying principles in AI, logic, and complex systems. I believe true innovation comes from grasping the fundamental mechanics of intelligence and cognition.'
    },
    {
      icon: Heart,
      title: 'Human-Centered Design',
      description: 'Prioritizing intuitive and meaningful user experiences in all creations. Technology should feel natural, empowering, and seamlessly integrated into human workflows and life patterns.'
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'Embracing new domains and evolving paradigms to foster interdisciplinary growth. I actively seek knowledge across linguistics, cognitive science, music theory, and strategic thinking.'
    },
    {
      icon: Music,
      title: 'Flow & Harmony',
      description: 'Integrating diverse passions like music and football to inform and inspire technical problem-solving. Creative expression and strategic analysis enhance my approach to AI development.'
    }
  ]

  const interests = [
    {
      icon: Headphones,
      title: 'Music & Composition',
      category: 'Guitar, Singing, Synthesizer, Indian Classical',
      connection: 'Musical Pattern Analysis',
      description: 'Analyzing music patterns, emotions, and alternate harmonies directly translates into understanding complex AI algorithms. The mathematical structures in music theory inform my approach to multi-modal AI, helping me find elegant solutions in system design. Harmonic relationships mirror neural network architectures, and compositional flow guides my user experience decisions.',
      skills: ['Pattern Recognition', 'Multi-modal Processing', 'Emotional Intelligence', 'System Architecture']
    },
    {
      icon: Activity,
      title: 'Football Tactics',
      category: 'Strategic Analysis & Off-ball Movement',
      connection: 'Spatial Intelligence & Decision-Making',
      description: 'Analyzing off-ball movements and strategic development in football sharpens my analytical skills, spatial reasoning, and pattern identification abilities. These skills directly apply to AI agent design and complex system optimization. Understanding positional play, team coordination, and adaptive strategies informs my approach to multi-agent systems and decision-making frameworks.',
      skills: ['Spatial Reasoning', 'Strategic Planning', 'Pattern Detection', 'System Optimization']
    },
    {
      icon: Zap,
      title: 'Creative Problem-Solving',
      category: 'Thinking Outside the Box',
      connection: 'Innovation Methodology',
      description: 'My drive to solve real-world issues with unconventional algorithms shapes my project ideation and problem-solving methodology. This approach links directly to my AI focus by encouraging novel architectures, interdisciplinary solutions, and human-centric innovation that challenges traditional boundaries in machine learning and cognitive computing.',
      skills: ['Algorithm Design', 'Creative Thinking', 'Cross-disciplinary Integration', 'Innovation Strategy']
    }
  ]

  const goals = [
    {
      timeframe: 'Near Term',
      items: [
        'Complete advanced agentic AI frameworks for practical applications',
        'Publish research on AI cognition and human-computer interaction',
        'Launch open-source tools for privacy-first productivity',
        'Build meaningful connections in the AI research community'
      ]
    },
    {
      timeframe: 'Long Term',
      items: [
        'Contribute to the development of beneficial AI systems',
        'Bridge the gap between academic research and practical applications',
        'Foster digital literacy and AI understanding in communities',
        'Create sustainable, ethical technology solutions'
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-700 text-white">
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
                <Heart size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  About Me
                </h1>
                <p className="text-xl opacity-90">
                  My story, values, and interdisciplinary approach
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Headshot & Introduction */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className="featured-card p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Professional Headshot Placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary-800 to-accent-600 flex items-center justify-center text-white text-6xl shadow-lg">
                      👨‍💻
                    </div>
                    <p className="text-sm text-primary-600 dark:text-sand-400 text-center mt-3 italic">
                      Professional headshot placeholder
                    </p>
                  </div>
                  
                  {/* Introduction */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-4">
                      Engineering Meaningful Intelligence
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-primary-700 dark:text-sand-200 mb-4">
                        Hi, I'm Akshaye Iyer – an Engineer of Ideas and Explorer of AI, LLMs, Linguistics, Football & Singing. 
                        My journey began with a fascination for how intelligence emerges from complexity, which naturally evolved into a passion for 
                        creating solutions that enhance human potential through meaningful technology.
                      </p>
                      <p className="text-primary-600 dark:text-sand-300">
                        I'm driven by the belief that the most profound innovations occur at the intersection of disciplines. 
                        My approach combines computer science, linguistics, cognitive science, and creative arts to build systems that are 
                        not just functional, but deeply human-centered and ethically grounded.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Core Values
            </h2>
            <div className="section-divider mb-12"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-sand-50 dark:bg-primary-800 rounded-2xl p-6 shadow-lg border border-primary-200 dark:border-sand-200/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-accent-600 to-accent-500 rounded-lg text-white flex-shrink-0">
                      <value.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-800 dark:text-sand-100 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-primary-600 dark:text-sand-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Diverse Interests & Technical Connections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Interdisciplinary Approach
            </h2>
            <div className="section-divider mb-12"></div>
            <p className="text-xl text-primary-600 dark:text-sand-300 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              My diverse interests inform and enrich my technical work, creating a feedback loop of inspiration and innovation. 
              Each passion contributes unique insights to my AI development and problem-solving methodology.
            </p>
            
            <div className="space-y-8">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="featured-card p-8"
                >
                  <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-gradient-to-r from-primary-800 to-accent-600 rounded-xl text-white mb-4">
                        <interest.icon size={32} />
                      </div>
                      <div className="text-center lg:text-left">
                        <h3 className="text-xl font-bold text-primary-800 dark:text-sand-100 mb-2">
                          {interest.title}
                        </h3>
                        <p className="text-sm text-accent-600 dark:text-accent-400 font-medium mb-1">
                          {interest.category}
                        </p>
                        <p className="text-xs text-primary-600 dark:text-sand-400 italic">
                          {interest.connection}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-primary-700 dark:text-sand-200 mb-6 leading-relaxed">
                        {interest.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {interest.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                            <span className="text-sm text-primary-600 dark:text-sand-300 font-medium">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Goals Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 dark:text-sand-100 mb-8 text-center">
              Goals & Vision
            </h2>
            <div className="section-divider mb-12"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {goals.map((goalSet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-sand-50 dark:bg-primary-800 rounded-2xl p-6 shadow-lg border border-primary-200 dark:border-sand-200/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="text-accent-600" size={24} />
                    <h3 className="text-xl font-bold text-primary-800 dark:text-sand-100">
                      {goalSet.timeframe}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {goalSet.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-primary-600 dark:text-sand-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-accent-600 to-accent-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Let's Connect
              </h3>
              <p className="text-sand-100 mb-6 max-w-2xl mx-auto">
                I'm always excited to discuss AI, technology, music, or any interesting ideas. 
                Whether you're working on similar projects or just want to chat about the intersection of creativity and technology, feel free to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:akshaye.iyer@outlook.com"
                  className="bg-sand-100 text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-sand-200 transition-colors duration-300"
                >
                  Send Email
                </a>
                <a
                  href="https://www.linkedin.com/in/akshaye-iyer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-700 text-sand-100 px-6 py-3 rounded-lg font-semibold hover:bg-accent-800 transition-colors duration-300"
                >
                  LinkedIn Profile
                </a>
                <Link
                  to="/theory"
                  className="bg-accent-700 text-sand-100 px-6 py-3 rounded-lg font-semibold hover:bg-accent-800 transition-colors duration-300"
                >
                  Read My Writings
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 