#!/usr/bin/env node

console.log('🚀 Custom Vercel build script starting...');
console.log('⏩ Skipping TypeScript checks...');

const { execSync } = require('child_process');

try {
  console.log('📦 Building with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 