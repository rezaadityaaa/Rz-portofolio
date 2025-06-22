"use client"

import { useEffect, useRef } from "react"
import { Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { AnimatedText } from "@/components/ui/animated-text"
import { personalInfo } from "@/data/personal-info"
import { developerRoles, skillTexts } from "@/data/rotating-texts"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      try {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        script.onload = () => {
          const gsap = (window as any).gsap
          if (!gsap || !heroRef.current) return

          const tl = gsap.timeline({ delay: 0.5 })

          tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
            .fromTo(
              subtitleRef.current,
              { opacity: 0, x: 100 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
              "-=0.3",
            )
            .fromTo(
              descriptionRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              "-=0.3",
            )
            .fromTo(
              buttonsRef.current?.children,
              { opacity: 0, y: 50, scale: 0.8 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
              "-=0.2",
            )
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Failed to load GSAP:", error)
      }
    }

    initAnimation()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-20 relative overflow-hidden"
    >
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl float-elegant"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl float-elegant"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent pulse-elegant"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 glass rounded-full mb-8">
            <span className="text-white/70 text-sm font-light tracking-wide">Available for new opportunities</span>
          </div>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white leading-tight">
          Hi, I'm <span className="gradient-text font-medium block md:inline mt-2 md:mt-0">{personalInfo.name}</span>
        </h1>

        {/* Rotating Text Subtitle */}
        <div
          ref={subtitleRef}
          className="text-2xl md:text-3xl lg:text-4xl text-white/80 mb-6 min-h-[3rem] flex items-center justify-center font-light"
        >
          <TypewriterText
            texts={developerRoles}
            className="text-elegant"
            typeSpeed={80}
            deleteSpeed={40}
            delayBetweenTexts={2000}
          />
        </div>

        {/* Animated Skills Text */}
        <div className="text-lg md:text-xl text-white/60 mb-12 min-h-[1.5rem] flex items-center justify-center">
          <AnimatedText texts={skillTexts} className="text-elegant italic" animationType="fade" interval={4000} />
        </div>

        <p
          ref={descriptionRef}
          className="text-lg md:text-xl text-white/70 mb-16 max-w-3xl mx-auto text-elegant leading-relaxed"
        >
          {personalInfo.description}
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="glass-strong hover:glow-medium text-white border-white/20 hover:border-white/40 transition-all duration-500 px-8 py-4 text-base font-light tracking-wide group"
          >
            <Download className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
            Download Resume
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-white hover:glass transition-all duration-500 px-8 py-4 text-base font-light tracking-wide group"
          >
            View Projects
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Elegant scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full mx-auto mt-2 pulse-elegant"></div>
        </div>
      </div>
    </section>
  )
}
