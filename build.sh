#!/bin/bash
set -e

echo "🚀 Building Expo Web..."

# Clear Babel and Metro cache
echo "🧹 Clearing caches..."
rm -rf node_modules/.cache
rm -rf .expo

# Build with expo (dependencies already installed by Vercel)
echo "🔨 Running Expo build..."
npx expo export --platform web --clear

# Inject Meta Pixel
echo "📊 Injecting Meta Pixel..."
node inject-pixel.mjs

echo "✅ Build complete!"
