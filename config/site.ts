// Domain configuration for SEO and metadata
export const SITE_CONFIG = {
  // Main domain
  domain: 'rezaditya.me',
  url: 'https://rezaditya.me',
  
  // Personal information
  name: 'Reza Aditya',
  title: 'Web Developer',
  description: 'Web Developer yang berpengalaman dalam Laravel, Next.js, dan Vue.js',
  
  // Social media profiles
  social: {
    github: 'https://github.com/rezaaditya',
    linkedin: 'https://linkedin.com/in/rezaaditya',
    twitter: 'https://twitter.com/rezaaditya',
    email: 'contact@rezaditya.me', // Update dengan email yang sesuai
  },
  
  // SEO Keywords
  keywords: [
    'Reza Aditya',
    'Reza',
    'rezaditya.me',
    'Web Developer',
    'Web Developer',
    'Laravel Developer',
    'Next.js Developer',
    'Vue.js Developer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio Reza',
    'Developer Indonesia',
    'Programmer Indonesia'
  ],
  
  // Open Graph image with cache busting
  ogImage: `/images/profile.webp?v=${Date.now()}`,
  
  // Google verification (to be updated after setup)
  googleVerification: 'your-google-verification-code',
  
  // Analytics (optional)
  googleAnalytics: 'G-XXXXXXXXXX', // To be updated
}

export default SITE_CONFIG;
