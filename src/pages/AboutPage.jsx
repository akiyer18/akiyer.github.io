import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Target, Compass, Book, Code2, Music, Brain } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const values = [
    {
      icon: Brain,
      title: 'Curiosity-Driven Learning',
      description: 'I believe in the power of asking questions, experimenting, and continuously expanding knowledge across diverse fields.'
    },
    {
      icon: Code2,
      title: 'Technology for Good',
      description: 'Building applications that solve real problems while respecting user privacy and promoting digital wellbeing.'
    },
    {
      icon: Music,
      title: 'Creative Expression',
      description: 'Exploring the intersection of technology and creativity, using AI to enhance rather than replace human artistry.'
    },
    {
      icon: Compass,
      title: 'Ethical Innovation',
      description: 'Developing AI systems that are transparent, fair, and designed to augment human capabilities responsibly.'
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
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
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
                <Heart size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  About Me
                </h1>
                <p className="text-xl opacity-90">
                  My story, values, and goals
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              My Journey
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Hi, I'm Akshaye Iyer – an Engineer of Ideas and Explorer of AI, LLMs, Linguistics, Football & Singing. 
                    My journey began with a fascination for how things work, which naturally evolved into a passion for 
                    creating solutions that enhance human potential.
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I'm driven by the belief that technology should serve humanity, not the other way around. This philosophy 
                    shapes every project I build – from privacy-first productivity tools to AI systems that augment creativity 
                    rather than replace it.
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    My interdisciplinary approach combines computer science, linguistics, cognitive science, and creative arts. 
                    This unique perspective allows me to build applications that are not just functional, but meaningful and 
                    human-centered at their core.
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    When I'm not coding or researching, you'll find me exploring music production, analyzing football tactics, 
                    or diving deep into papers on consciousness and AI. These diverse interests inform and enrich my technical work, 
                    creating a feedback loop of inspiration and innovation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white">
                      <value.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {value.description}
                      </p>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Goals & Vision
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {goals.map((goalSet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="text-emerald-500" size={24} />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {goalSet.timeframe}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {goalSet.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
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
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Let's Connect
              </h3>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                I'm always excited to discuss AI, technology, music, or any interesting ideas. 
                Whether you're working on similar projects or just want to chat, feel free to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:akshaye.iyer@outlook.com"
                  className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-300"
                >
                  Send Email
                </a>
                <a
                  href="https://www.linkedin.com/in/akshaye-iyer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors duration-300"
                >
                  LinkedIn Profile
                </a>
                <Link
                  to="/theory"
                  className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors duration-300"
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