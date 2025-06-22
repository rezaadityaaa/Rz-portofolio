"use client"

import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/project-card"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6 sm:px-8 lg:px-12 glass relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white tracking-wide">
            Featured <span className="gradient-text font-medium">Projects</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto text-elegant">
            A collection of projects that showcase my skills and passion for creating exceptional digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
