#!/bin/bash

# Build script para Vercel com Meta Pixel

echo "🚀 Starting Expo web build..."

# Build do Expo
bun run export:web

echo "✅ Build completed!"

# Injetar Meta Pixel no index.html gerado
echo "📊 Injecting Meta Pixel into HTML..."

if [ -f "dist/index.html" ]; then
  # Adicionar Meta Pixel antes do </head>
  sed -i 's|</head>|<!-- Meta Pixel Code -->\n<script>\n!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='"'"'2.0'"'"';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'"'"'script'"'"','"'"'https://connect.facebook.net/en_US/fbevents.js'"'"');fbq('"'"'init'"'"','"'"'9943378875750722'"'"');fbq('"'"'track'"'"','"'"'PageView'"'"');\n</script>\n<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=9943378875750722\&amp;ev=PageView\&amp;noscript=1"/></noscript>\n<!-- End Meta Pixel Code -->\n</head>|' dist/index.html

  echo "✅ Meta Pixel injected successfully!"
else
  echo "❌ Warning: dist/index.html not found"
fi

echo "🎉 Build ready for deployment!"
