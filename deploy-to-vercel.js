#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Сохраняем путь к original package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Читаем текущий package.json
const originalPackageJson = fs.readFileSync(packageJsonPath, 'utf8');
const packageJson = JSON.parse(originalPackageJson);

console.log('Backing up original package.json...');
fs.writeFileSync(packageJsonPath + '.backup', originalPackageJson);

try {
  // Изменяем скрипт build
  console.log('Modifying package.json for Vercel deployment...');
  packageJson.scripts.build = 'vite build';
  
  // Временно перезаписываем package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Запускаем деплой на Vercel
  console.log('Starting Vercel deployment...');
  execSync('npx vercel --prod', { stdio: 'inherit' });
  
  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Error during deployment:', error);
} finally {
  // Восстанавливаем оригинальный package.json
  console.log('Restoring original package.json...');
  fs.writeFileSync(packageJsonPath, originalPackageJson);
  console.log('Done!');
} 