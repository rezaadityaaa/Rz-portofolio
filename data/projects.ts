import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "education",
    title: "Education Platform",
    description: "Full-stack education platform for SD N 1 Padangsari",
    technologies: ["laravel", "Livewire", "Fillament","SQlite","TailwindCSS"],
    emoji: "",
    gradient: "from-blue-600 to-purple-600",
    image: "/images/sd-padangsari.png",
  },
  {
    id: "e-commerce",
    title: "E-commerce Platform",
    description: "Full-stack E-commerce Platform for Why Coffee",
    technologies: ["Laravel", "TailwindCSS", "SQlite"],
    emoji: "",
    gradient: "from-green-600 to-teal-600",
    image: "/images/whytrack.png",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Beautiful weather app with location-based forecasts",
    technologies: ["Vue.js", "API Integration", "PWA"],
    emoji: "",
    gradient: "from-orange-600 to-red-600",
    image: "/placeholder.jpg",
  },
]
