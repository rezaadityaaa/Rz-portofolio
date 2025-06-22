"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"

interface TiltedCardProps {
  children: React.ReactNode
  className?: string
  tiltMaxAngle?: number
  perspective?: number
  scale?: number
  transitionDuration?: number
}

export function TiltedCard({
  children,
  className = "",
  tiltMaxAngle = 15,
  perspective = 1000,
  scale = 1.05,
  transitionDuration = 300,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateX = (mouseY / (rect.height / 2)) * tiltMaxAngle
      const rotateY = (mouseX / (rect.width / 2)) * tiltMaxAngle

      card.style.transform = `
        perspective(${perspective}px)
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      card.style.transition = `transform ${transitionDuration}ms ease-out`
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      card.style.transition = `transform ${transitionDuration}ms ease-out`
      card.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [tiltMaxAngle, perspective, scale, transitionDuration])

  return (
    <div
      ref={cardRef}
      className={`transform-gpu transition-all duration-300 ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`relative transition-all duration-300 ${
          isHovered ? "shadow-2xl shadow-white/20" : "shadow-lg shadow-white/10"
        }`}
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
