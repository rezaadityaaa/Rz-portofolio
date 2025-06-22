"use client"

import { contactLinks } from "@/data/contact"
import { ContactButton } from "@/components/ui/contact-button"

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <div className="inline-block px-6 py-3 glass rounded-full mb-8">
            <span className="text-white/70 text-sm font-light tracking-wide">Let's connect</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white tracking-wide">
          Let's Work <span className="gradient-text font-medium">Together</span>
        </h2>

        <p className="text-xl md:text-2xl text-white/70 mb-16 max-w-3xl mx-auto text-elegant leading-relaxed">
          I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas to
          life.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {contactLinks.map((link, index) => (
            <ContactButton key={link.name} link={link} isPrimary={index === 0} />
          ))}
        </div>

        {/* Elegant divider */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-white/50 text-sm font-light tracking-wide">
            Available for freelance opportunities worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
