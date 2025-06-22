import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    technologies: ["React", "Node.js", "MongoDB"],
    emoji: "",
    gradient: "from-blue-600 to-purple-600",
    image: "/images/profile.jpeg",
  },
  {
    id: "task-management",
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    emoji: "",
    gradient: "from-green-600 to-teal-600",
    image: "/placeholder.jpg",
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
