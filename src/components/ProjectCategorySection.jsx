import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

export default function ProjectCategorySection({ id, icon, title, description, projects, color }) {
  if (!projects || projects.length === 0) return null
  return (
    <section id={id} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className={`text-3xl p-2 rounded-xl bg-gradient-to-r ${color} text-white flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
            {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
} 