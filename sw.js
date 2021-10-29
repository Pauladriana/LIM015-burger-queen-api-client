/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'Burger-queen';
const urlsToCache = [
  '../',
  '../style/Admin.css',
  '../style/loader.css',
  '../style/Login.css',
  '../style/Modal.css',
  '../style/Orders.css',
  '../style/Routes.css',
  '../style/Waiter.css',
  '../services/get.js',
  '../services/delete.js',
  '../services/post.js',
  '../services/put.js',
  '../routes/routes.js',
  '../pages/Admin.js',
  '../pages/AllOrders.js',
  '../pages/Chef.js',
  '../pages/Chefdelivering.js',
  '../pages/ChefOrders.js',
  '../pages/EditProduct.js',
  '../pages/EditUser.js',
  '../pages/Error404.js',
  '../pages/Login.js',
  '../pages/NewProduct.js',
  '../pages/NewUser.js',
  '../pages/Products.js',
  '../pages/Users.js',
  '../pages/Waiter.js',
  '../pages/Waiterneworder.js',
  '../pages/LandingPage.js',
  '../media/background.jpg',
  '../media/bq-logo.svg',
  '../media/landing.jpg',
  '../helpers/helpers.js',
  '../helpers/helpHttp.js',
  '../components/Breakfast.js',
  '../components/Diary.js',
  '../components/Loader.js',
  '../components/Modals.js',
  '../index.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting());
      })
      .catch((err) => console.log('Falló registro de cache', err)),
  );
});

// una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión

self.addEventListener('activate', (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim()),
  );
});

// cuando el navegador recupera una url
self.addEventListener('fetch', (e) => {
  // Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then((res) => {
        if (res) {
          // recuperar del cache
          return res;
        }
        // recuperar de la petición a la url
        return fetch(e.request);
      }),
  );
});
