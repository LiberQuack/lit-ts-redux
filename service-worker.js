importScripts("/lit-ts-redux/precache-manifest.8b485771f71dbf8a35a482479636c145.js", "/lit-ts-redux/workbox-v3.3.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/lit-ts-redux/workbox-v3.3.0"});
//Wepback will import workbox and pre-cache manifest here

if (self.workbox) {

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

}
