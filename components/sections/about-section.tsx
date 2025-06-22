"use client"

import { aboutDescription } from "@/data/personal-info"
import { ProfileCard } from "@/components/ui/profile-card"
import { FloatingCard } from "@/components/ui/floating-card"
import { RotatingText } from "@/components/ui/rotating-text"

export function AboutSection() {
  const aboutTitles = ["Get to know me!", "About Reza", "My Story", "Who am I?", "Meet the Developer"]

  return (
    <section id="about" className="py-32 px-6 sm:px-8 lg:px-12 relative">
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-white/2 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-20 text-white tracking-wide">
          About <span className="gradient-text font-medium">Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <h3 className="text-3xl md:text-4xl font-light text-white min-h-[3rem] flex items-center">
              <RotatingText texts={aboutTitles} interval={3500} />
            </h3>

            <div className="space-y-6">
              <p className="text-white/70 text-lg leading-relaxed text-elegant">{aboutDescription.intro}</p>
              <p className="text-white/70 text-lg leading-relaxed text-elegant">{aboutDescription.hobby}</p>
              <p className="text-white/70 text-lg leading-relaxed text-elegant">{aboutDescription.philosophy}</p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="order-1 lg:order-2">
            <FloatingCard floatIntensity={8} rotateIntensity={1}>
              <ProfileCard className="transform hover:scale-105 transition-transform duration-500" />
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  )
}
