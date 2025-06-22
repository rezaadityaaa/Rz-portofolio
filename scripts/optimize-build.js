#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Build optimization script
console.log('🚀 Starting build optimization...');

// Check if Sharp is installed for image optimization
try {
  require('sharp');
  console.log('✅ Sharp is available for image optimization');
} catch (e) {
  console.log('⚠️  Sharp not found - installing for better image performance...');
  require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
}

// Check for unused dependencies
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

console.log('📦 Checking for potential bundle optimization opportunities...');

const heavyPackages = [
  'moment', // Suggest date-fns instead
  'lodash', // Suggest individual imports
  '@fortawesome/fontawesome-free', // Suggest lucide-react
  'material-ui', // Check if all components are needed
];

const suggestions = [];
Object.keys(dependencies).forEach(dep => {
  if (heavyPackages.some(heavy => dep.includes(heavy))) {
    suggestions.push(`Consider replacing ${dep} with a lighter alternative`);
  }
});

if (suggestions.length > 0) {
  console.log('💡 Bundle optimization suggestions:');
  suggestions.forEach(suggestion => console.log(`   - ${suggestion}`));
}

// Create .env.local for production optimizations if it doesn't exist
const envLocal = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envLocal)) {
  const envContent = `# Performance optimizations
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS="--max_old_space_size=4096"
`;
  fs.writeFileSync(envLocal, envContent);
  console.log('📝 Created .env.local with performance optimizations');
}

console.log('✨ Build optimization complete!');
console.log('🔍 Run "npm run build:analyze" to analyze your bundle size');
