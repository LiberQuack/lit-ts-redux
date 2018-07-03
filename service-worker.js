importScripts("/lit-ts-redux/precache-manifest.538d62891b633c5adf91e192e13e4c81.js", "/lit-ts-redux/workbox-v3.3.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/lit-ts-redux/workbox-v3.3.0"});
//Wepback will import workbox and pre-cache manifest here

if (self.workbox) {

    workbox.skipWaiting();

    workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

    workbox.routing.registerNavigationRoute('/index.html');

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

}
