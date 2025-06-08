import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      href: 'https://github.com/akiyer18',
      icon: Github,
      label: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/in/akshaye-iyer/',
      icon: Linkedin,
      label: 'LinkedIn'
    },
    {
      href: 'mailto:akshaye.iyer@outlook.com',
      icon: Mail,
      label: 'Email'
    }
  ]

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold gradient-text">Akshaye Iyer</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
            Driven by curiosity and purpose, I explore the frontiers of artificial intelligence—especially 
            agentic frameworks, language models, and AI-assisted creativity—to build tools and systems that 
            solve real problems and improve lives. My projects reflect a blend of research, innovation, and a
            deep commitment to connecting people through technology.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Explore Projects
            </h3>
            <div className="space-y-2">
              <a
                href="/growth"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
              >
                📈 Growth Mindset Tools
              </a>
              <a
                href="/music"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
              >
                🎵 Music Projects
              </a>
              <a
                href="/ai"
                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
              >
                🤖 AI Tools
              </a>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'GitHub Pages'].map((tech) => (
                <span
                  key={tech}
                  className="tech-tag text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Open source portfolio built with modern technologies. 
              <a
                href="https://github.com/akiyer18/akiyer18.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 dark:text-accent-400 hover:underline ml-1"
              >
                View source code
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span>&copy; {currentYear} Akshaye Iyer</span>
              <span>•</span>
              <span>Built with</span>
              <Heart size={14} className="text-red-500" />
              <span>and modern web technologies</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://github.com/akiyer18/akiyer18.github.io/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
              >
                MIT License
              </a>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-gray-600 dark:text-gray-300">
                Privacy-first design
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 