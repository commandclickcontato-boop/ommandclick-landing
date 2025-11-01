import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📊 Injecting Meta Pixel and fixing script tags...');

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

// Loading indicator and error handler
const loadingScript = `
  <style>
    .loading-indicator {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .loading-content {
      text-align: center;
      color: white;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #1e293b;
      border-top: 4px solid #2563eb;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <script>
    console.log('[CommandClick] HTML loaded');

    // Add loading indicator when DOM is ready
    function addLoadingIndicator() {
      if (!document.body) {
        // If body is not ready, wait a bit and try again
        setTimeout(addLoadingIndicator, 10);
        return;
      }

      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-indicator';
      loadingDiv.id = 'loading';
      loadingDiv.innerHTML = '<div class="loading-content"><div class="spinner"></div><h2>Command Click</h2><p>Carregando...</p></div>';
      document.body.appendChild(loadingDiv);
    }

    // Call immediately or wait for DOMContentLoaded
    if (document.body) {
      addLoadingIndicator();
    } else {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addLoadingIndicator);
      } else {
        addLoadingIndicator();
      }
    }

    // Check if app loaded after 5 seconds
    setTimeout(() => {
      const root = document.getElementById('root');
      if (!root || !root.hasChildNodes() || root.children.length === 0) {
        console.error('[CommandClick] App failed to load');
        loadingDiv.innerHTML = '<div class="loading-content"><h2 style="color: #ef4444;">❌ Erro ao carregar</h2><p>Por favor, recarregue a página</p><button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Recarregar</button></div>';
      } else {
        console.log('[CommandClick] App loaded successfully');
        loadingDiv.style.display = 'none';
      }
    }, 5000);

    // Also check immediately when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const root = document.getElementById('root');
        if (root && root.hasChildNodes() && root.children.length > 0) {
          console.log('[CommandClick] App ready');
          const loading = document.getElementById('loading');
          if (loading) loading.style.display = 'none';
        }
      }, 1000);
    });
  </script>
`;

// Inject before </head>
html = html.replace('</head>', `${metaPixelCode}${loadingScript}</head>`);

// FIX: Change script tag from defer to type="module"
html = html.replace(
  /<script src="([^"]*)" defer><\/script>/g,
  '<script type="module" src="$1"></script>'
);

// Write back
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('✅ Meta Pixel, loading indicator, and module fix applied!');
