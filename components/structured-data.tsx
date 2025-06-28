'use client';

import Script from 'next/script';

export function StructuredData() {
  const CACHE_BUSTER = Date.now();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Reza Aditya",
    "alternateName": ["Reza", "Reza Developer", "rezaditya"],
    "jobTitle": "Web Developer",
    "description": "Web Developer yang berpengalaman dalam Laravel, Next.js, dan Vue.js",
    "url": "https://rezaditya.me",
    "image": `https://rezaditya.me/images/profile.webp?v=${CACHE_BUSTER}`,
    "sameAs": [
      "https://github.com/rezaaditya",
      "https://linkedin.com/in/rezaaditya", 
      "https://twitter.com/rezaaditya"
    ],
    "knowsAbout": [
      "Web Development",
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
