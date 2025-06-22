"use client"

import { skills } from "@/data/skills"
import { SkillCard } from "@/components/ui/skill-card"
import { AnimatedText } from "@/components/ui/animated-text"

export function SkillsSection() {
  const skillTitles = [
    "Skills & Technologies",
    "Technical Expertise",
    "My Tech Stack",
    "Development Tools",
    "What I Work With",
  ]

  return (
    <section id="skills" className="py-32 px-6 sm:px-8 lg:px-12 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-20 text-white min-h-[4rem] flex items-center justify-center tracking-wide">
          <AnimatedText texts={skillTitles} animationType="slide" interval={4000} />
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
