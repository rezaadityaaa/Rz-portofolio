"use client"

import { useRef, useEffect } from "react"
import { Code, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/types"

const iconMap = {
  Code,
  Database,
}

interface SkillCardProps {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  const IconComponent = iconMap[skill.icon as keyof typeof iconMap]
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      try {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        script.onload = () => {
          const gsap = (window as any).gsap
          if (!gsap || !cardRef.current || !iconRef.current) return

          const card = cardRef.current
          const icon = iconRef.current

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(icon, {
              rotation: 5,
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            })
          })
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Failed to load GSAP:", error)
      }
    }

    initAnimation()
  }, [])

  return (
    <div
      ref={cardRef}
      className="text-center cursor-pointer p-10 rounded-3xl glass-strong hover:glow-medium transition-all duration-500 border-white/10 group"
    >
      <div
        ref={iconRef}
        className="w-24 h-24 glass rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:glow-subtle transition-all duration-500"
      >
        <IconComponent className="w-12 h-12 text-white" />
      </div>

      <h3 className="text-2xl md:text-3xl font-light mb-8 text-white tracking-wide">{skill.category}</h3>

      <div className="flex flex-wrap gap-3 justify-center">
        {skill.technologies.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 transition-all duration-300 px-4 py-2 text-sm font-light tracking-wide"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  )
}
