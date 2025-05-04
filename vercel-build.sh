#!/bin/bash
echo "Starting custom build..."
npm install
echo "Building project without TypeScript checks..."
./node_modules/.bin/vite build
echo "Build completed!" 