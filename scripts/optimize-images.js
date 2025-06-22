#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const optimizedDir = path.join(imagesDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImages() {
  const imageFiles = fs.readdirSync(imagesDir).filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.startsWith('.')
  );

  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const name = path.parse(file).name;
    
    console.log(`Optimizing ${file}...`);
    
    try {
      // Generate WebP version
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(path.join(optimizedDir, `${name}.webp`));
      
      // Generate AVIF version (most efficient)
      await sharp(inputPath)
        .avif({ quality: 80, effort: 6 })
        .toFile(path.join(optimizedDir, `${name}.avif`));
      
      // Generate optimized original format
      const ext = path.parse(file).ext.toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(inputPath)
          .jpeg({ quality: 85, progressive: true })
          .toFile(path.join(optimizedDir, `${name}-optimized.jpg`));
      } else if (ext === '.png') {
        await sharp(inputPath)
          .png({ quality: 85, progressive: true })
          .toFile(path.join(optimizedDir, `${name}-optimized.png`));
      }
      
      console.log(`✓ Optimized ${file}`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error.message);
    }
  }
  
  console.log('Image optimization complete!');
}

// Check if sharp is available
try {
  require.resolve('sharp');
  optimizeImages();
} catch (error) {
  console.log('Sharp not found. Please install it with: npm install sharp');
  console.log('Skipping image optimization...');
}
