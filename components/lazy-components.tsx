import { lazy, Suspense } from 'react'

// Lazy load heavy components - import named exports
export const LazyProjectCard = lazy(() => 
  import('./ui/project-card').then(module => ({ default: module.ProjectCard }))
)
export const LazySkillCard = lazy(() => 
  import('./ui/skill-card').then(module => ({ default: module.SkillCard }))
)
export const LazyProfileCard = lazy(() => 
  import('./ui/profile-card').then(module => ({ default: module.ProfileCard }))
)
export const LazyContactButton = lazy(() => 
  import('./ui/contact-button').then(module => ({ default: module.ContactButton }))
)

// Loading components
const ComponentSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
)

// Wrapper components with suspense
export const ProjectCard = (props: any) => (
  <Suspense fallback={<ComponentSkeleton className="h-64 w-full" />}>
    <LazyProjectCard {...props} />
  </Suspense>
)

export const SkillCard = (props: any) => (
  <Suspense fallback={<ComponentSkeleton className="h-32 w-full" />}>
    <LazySkillCard {...props} />
  </Suspense>
)

export const ProfileCard = (props: any) => (
  <Suspense fallback={<ComponentSkeleton className="h-96 w-full" />}>
    <LazyProfileCard {...props} />
  </Suspense>
)

export const ContactButton = (props: any) => (
  <Suspense fallback={<ComponentSkeleton className="h-12 w-32" />}>
    <LazyContactButton {...props} />
  </Suspense>
)
