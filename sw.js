importScripts("/lit-ts-redux/precache-manifest.c859b2726c927fb920fcfa77b44fa0fc.js", "/lit-ts-redux/workbox-v3.3.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/lit-ts-redux/workbox-v3.3.0"});
//Wepback will import workbox and preachemanifest here;
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);
