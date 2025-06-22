'use client';

import Script from 'next/script';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Reza Aditya",
    "alternateName": ["Reza", "Reza Developer", "rezaditya"],
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer yang berpengalaman dalam Laravel, Next.js, dan Vue.js",
    "url": "https://rezaditya.me",
    "image": "https://rezaditya.me/images/profile.jpeg",
    "sameAs": [
      "https://github.com/rezaaditya",
      "https://linkedin.com/in/rezaaditya", 
      "https://twitter.com/rezaaditya"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "Laravel",
      "Next.js",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "PHP",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "React",
      "Node.js"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Indonesia"
    },
    "birthPlace": "Indonesia",
    "nationality": "Indonesian",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rezaditya.me"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default StructuredData;
