#!/bin/bash
set -e

echo "🚀 Building Expo Web..."

# Build with expo (dependencies already installed by Vercel)
echo "🔨 Running Expo build..."
npx expo export --platform web

# Inject Meta Pixel
echo "📊 Injecting Meta Pixel..."
node inject-pixel.mjs

echo "✅ Build complete!"
