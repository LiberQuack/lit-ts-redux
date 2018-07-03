//Wepback will import workbox and pre-cache manifest here

if (self.workbox) {

    const indexHtml = self.__precacheManifest.find(it => it.url.indexOf('/index.html') > -1);

    workbox.skipWaiting();
    workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
    workbox.routing.registerNavigationRoute(indexHtml.url);
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
