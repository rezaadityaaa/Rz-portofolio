"use client"

import { useEffect, useState } from "react"

interface AnimatedTextProps {
  texts: string[]
  className?: string
  animationType?: "fade" | "slide" | "flip" | "scale"
  interval?: number
}

export function AnimatedText({ texts, className = "", animationType = "fade", interval = 3000 }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsAnimating(false)
      }, 400)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-400 ease-in-out"

    switch (animationType) {
      case "slide":
        return `${baseClasses} ${
          isAnimating ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
        }`
      case "flip":
        return `${baseClasses} ${isAnimating ? "opacity-0 transform rotateX-90" : "opacity-100 transform rotateX-0"}`
      case "scale":
        return `${baseClasses} ${isAnimating ? "opacity-0 transform scale-75" : "opacity-100 transform scale-100"}`
      default: // fade
        return `${baseClasses} ${isAnimating ? "opacity-0" : "opacity-100"}`
    }
  }

  return <span className={`inline-block ${getAnimationClasses()} ${className}`}>{texts[currentIndex]}</span>
}
