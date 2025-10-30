import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📊 Injecting Meta Pixel into HTML...');

const htmlPath = path.join(__dirname, 'dist', 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error('❌ Error: dist/index.html not found');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Meta Pixel Code
const metaPixelCode = `
  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '9943378875750722');
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=9943378875750722&ev=PageView&noscript=1" />
  </noscript>
  <!-- End Meta Pixel Code -->
`;

// Inject before </head>
html = html.replace('</head>', `${metaPixelCode}</head>`);

// Write back
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('✅ Meta Pixel injected successfully!');
