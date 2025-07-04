import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Sun, Moon, Menu, X, Github, Linkedin, Mail } from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  const navItems = [
    { path: '/applications', label: 'Applications', description: 'Projects and tools I\'ve built using AI' },
    { path: '/about', label: 'About Me', description: 'My story, values, and goals' },
    { path: '/theory', label: 'Theory & Writings', description: 'Personal papers and thoughts on AI, cognition, society' },
    { path: '/advanced', label: 'Advanced Projects', description: 'Experimental work, research, and agentic AI frameworks' },
  ]

  const socialLinks = [
    { href: 'https://github.com/akiyer18', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/akshaye-iyer/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:akshaye.iyer@outlook.com', icon: Mail, label: 'Email' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sand-100/80 dark:bg-primary-900/80 backdrop-blur-lg border-b border-primary-200 dark:border-sand-200/20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            <span className="text-2xl">🚀</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-accent-600 dark:text-accent-400'
                      : 'text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-600 to-primary-800 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-200 dark:border-sand-200/20">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-accent-600 dark:text-accent-400'
                      : 'text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-primary-200 dark:border-sand-200/20">
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 text-primary-600 dark:text-sand-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 