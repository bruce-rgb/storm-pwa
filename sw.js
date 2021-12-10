const staticCacheName = 'app-static-v1.1';

const staticCacheFileNames = [
  'img/icon-144x144.png',
  'img/icon-192x192.png',
  'img/icon-256x256.png',
  'img/icon-384x384.png',
  'img/icon-512x512.png',
  'TemplateData/favicon.ico',
  'TemplateData/fullscreen.png',
  'TemplateData/progressEmpty.Dark.png',
  'TemplateData/progressEmpty.Light.png',
  'TemplateData/progressFull.Dark.png',
  'TemplateData/progressFull.Light.png',
  'TemplateData/progressLogo.Dark.png',
  'TemplateData/progressLogo.Light.png',
  'TemplateData/style.css',
  'TemplateData/UnityProgress.js',
  'TemplateData/webgl-logo.png',
  'Build/UnityLoader.js',
  'Build/WebGL.data.unityweb',
  'Build/WebGL.json',
  'Build/WebGL.wasm.code.unityweb',
  'Build/WebGL.wasm.framework.unityweb',
  'js/app.js'
];

//Install event and saving cache
self.addEventListener('install', (event) => {
  //self.skipWaiting();
  event.waitUntil(
    caches.open(staticCacheName)
    .then((cache) => {
      cache.addAll([
        '/',
        'manifest.json',
        ...staticCacheFileNames
      ]);
    })
    .catch((error) => {
      console.log(`Error caching static assets: ${error}`);
    })
  );
});

//Activate event and delete old cache
self.addEventListener('activate', (event) => {
  //self.skipWaiting();
  event.waitUntil(
    caches.keys().then(keys => {
      keys.forEach(key => {
        if (key !== staticCacheName && key.includes('app-static-')) {
          return caches.delete(key);
        }
      });
    })
  );
});

//Intercept requests and return cache
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});


self.addEventListener('push', event => {
  console.log('Notificación recibida');
})
