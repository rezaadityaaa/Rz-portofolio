"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  floatIntensity?: number
  rotateIntensity?: number
}

export function FloatingCard({
  children,
  className = "",
  floatIntensity = 10,
  rotateIntensity = 2,
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let animationId: number

    const animate = () => {
      const time = Date.now() * 0.002
      const y = Math.sin(time) * floatIntensity
      const rotateX = Math.sin(time * 0.5) * rotateIntensity
      const rotateY = Math.cos(time * 0.3) * rotateIntensity

      card.style.transform = `
        translateY(${y}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [floatIntensity, rotateIntensity])

  return (
    <div ref={cardRef} className={`transform-gpu ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}
