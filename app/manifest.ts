import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Reza Aditya - Web Developer Portfolio',
    short_name: 'Reza Portfolio',
    description: 'Portfolio profesional Reza Aditya sebagai Web Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/profile.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/images/profile.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  }
}
