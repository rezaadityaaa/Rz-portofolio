"use client"

import { useRef, useEffect } from "react"
import { Mail, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ContactLink } from "@/types"

const iconMap = {
  Mail,
  Linkedin,
  Github,
}

interface ContactButtonProps {
  link: ContactLink
  isPrimary?: boolean
}

export function ContactButton({ link, isPrimary = false }: ContactButtonProps) {
  const IconComponent = iconMap[link.icon as keyof typeof iconMap]
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      try {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        script.onload = () => {
          const gsap = (window as any).gsap
          if (!gsap || !buttonRef.current) return

          const button = buttonRef.current

          button.addEventListener("mouseenter", () => {
            gsap.to(button, {
              scale: 1.05,
              y: -3,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          button.addEventListener("mouseleave", () => {
            gsap.to(button, {
              scale: 1,
              y: 0,
              duration: 0.3,
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
    <Button
      size="lg"
      variant={isPrimary ? "default" : "ghost"}
      className={
        isPrimary
          ? "glass-strong hover:glow-medium text-white border-white/20 hover:border-white/40 transition-all duration-500 px-8 py-4 text-base font-light tracking-wide"
          : "text-white/80 hover:text-black hover:glass transition-all duration-500 px-8 py-4 text-base font-light tracking-wide"
      }
      asChild
    >
      <a ref={buttonRef} href={link.href} target="_blank" rel="noopener noreferrer" className="group">
        <IconComponent className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
        <span>{link.name}</span>
      </a>
    </Button>
  )
}
