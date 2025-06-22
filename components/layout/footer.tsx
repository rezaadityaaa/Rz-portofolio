export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 sm:px-8 lg:px-12 glass">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-light text-white tracking-wider mb-4 md:mb-0">
            <span className="gradient-text font-medium">Rz</span>
            <span className="text-white/60">.</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/50 text-sm font-light tracking-wide mb-2">
              &copy; {new Date().getFullYear()} Reza Ramadhon. All rights reserved.
            </p>
            <p className="text-white/80 text-xs font-light tracking-wide">Crafted with passion and precision</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
