#!/bin/bash
set -e

echo "🚀 Building Expo Web..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build with expo
echo "🔨 Running Expo build..."
npx expo export --platform web

# Inject Meta Pixel
echo "📊 Injecting Meta Pixel..."
node inject-pixel.mjs

echo "✅ Build complete!"
