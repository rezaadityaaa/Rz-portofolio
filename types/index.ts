export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  emoji: string
  gradient: string
  image?: string
}

export interface Skill {
  category: string
  icon: string
  technologies: string[]
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  stats: {
    projects: number
    experience: number
    clients: number
    coffee: number
  }
}

export interface ContactLink {
  name: string
  icon: string
  href: string
}
