import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Reza Aditya - Full Stack Developer Portfolio',
    short_name: 'Reza Portfolio',
    description: 'Portfolio profesional Reza Aditya sebagai Full Stack Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/profile.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/images/profile.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}
