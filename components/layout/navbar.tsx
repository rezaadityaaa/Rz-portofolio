"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const initAnimation = async () => {
      try {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        script.onload = () => {
          const gsap = (window as any).gsap
          if (!gsap || !navRef.current || !logoRef.current || !menuRef.current) return

          const tl = gsap.timeline()

          tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" })
            .fromTo(
              logoRef.current,
              { x: -50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
              "-=0.5",
            )
            .fromTo(
              menuRef.current.children,
              { y: -20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
              "-=0.3",
            )
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Failed to load GSAP:", error)
      }
    }

    initAnimation()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }

    setIsOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <div ref={logoRef} className="text-2xl font-light text-white tracking-wider">
            <span className="gradient-text font-medium">Rz</span>
            <span className="text-white/60">.</span>
          </div>

          {/* Desktop Navigation */}
          <div ref={menuRef} className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white/80 hover:text-white transition-all duration-300 relative group cursor-pointer text-sm font-light tracking-wide"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-white to-transparent transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg glass transition-all duration-300 hover:glow-subtle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 glass-strong rounded-lg mx-4 mb-4">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-white/80 hover:text-white transition-colors cursor-pointer text-sm font-light"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
