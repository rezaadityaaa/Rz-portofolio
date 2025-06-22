"use client"

import Image from "next/image"
import { TiltedCard } from "./tilted-card"

interface ProfileCardProps {
  imageUrl?: string
  className?: string
}

export function ProfileCard({ imageUrl, className = "" }: ProfileCardProps) {
  return (
    <TiltedCard className={`max-w-md mx-auto ${className}`} tiltMaxAngle={8} scale={1.02}>
      <div className="relative overflow-hidden rounded-3xl glass-strong backdrop-blur-xl p-8 glow-subtle">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>

        {/* Geometric accent */}
        <div className="absolute top-6 right-6 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border border-white/10 rounded-full"></div>

        {/* Profile Image */}
        <div className="relative z-10">
          <div className="w-72 h-72 mx-auto rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              width={288}
              height={288}
              src="/images/profile.jpeg"
              alt="Reza Aditya - Full Stack Developer"
              className="w-full h-full object-cover"
              priority={true}
              quality={85}
              sizes="288px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>

        {/* Floating accent elements */}
        <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/40 rounded-full pulse-elegant"></div>
        <div className="absolute top-1/2 left-4 w-1 h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
        <div className="absolute bottom-1/3 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
      </div>
    </TiltedCard>
  )
}
