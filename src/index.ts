import "./styles/styles.scss";
import "./styles/critical-path.scss";

import {polyfillRunner} from "./polyfills/polyfill";
import {app} from "./application/app";

async function loadPolyfills() {
    await polyfillRunner();
}

async function loadApp() {
    await loadPolyfills();

    app.startRouter();

    //Using require here because despite not generating
    //a new chunk (as we wish)... it will only be executed from here on
    require("./ui/shell");

    //TODO: Rework service worker
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register(`${settings.app.routes.root}service-worker.js`)
    //         .then(() => console.log("We work offline"));
    // }
}

loadApp();
