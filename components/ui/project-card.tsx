"use client"

import { useRef, useEffect } from "react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const emojiRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      try {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        script.onload = () => {
          const gsap = (window as any).gsap
          if (!gsap || !cardRef.current || !imageRef.current || !emojiRef.current) return

          const card = cardRef.current
          const image = imageRef.current
          const emoji = emojiRef.current

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(image, {
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            })
            if (emoji) {
              gsap.to(emoji, {
                rotation: 10,
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out",
              })
            }
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            })
            if (emoji) {
              gsap.to(emoji, {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              })
            }
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
    <Card
      ref={cardRef}
      className="glass-strong hover:glow-medium group cursor-pointer overflow-hidden transition-all duration-500 border-white/10"
    >
      <div className="relative overflow-hidden">
        <div
          ref={imageRef}
          className={`w-full h-56 ${!project.image ? `bg-gradient-to-br ${project.gradient}` : 'bg-gray-900'} flex items-center justify-center relative overflow-hidden`}
        >
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {project.emoji && (
                <span ref={emojiRef} className="absolute bottom-4 left-4 text-3xl z-10">
                  {project.emoji}
                </span>
              )}
            </>
          ) : (
            <span ref={emojiRef} className="text-5xl z-10">
              {project.emoji}
            </span>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 z-10">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl font-medium tracking-wide">{project.title}</CardTitle>
        <CardDescription className="text-elegant leading-relaxed text-white">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-white/20 text-white/80 text-xs hover:bg-white/10 transition-colors px-3 py-1 font-light"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-white/80 hover:text-black hover:glass transition-all duration-300 px-4 py-2 font-light group"
          >
            <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            <span>Live Demo</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/80 hover:text-black hover:glass transition-all duration-300 px-4 py-2 font-light group"
          >
            <Github className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            <span>Code</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
