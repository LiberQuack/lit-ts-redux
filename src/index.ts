import {polyfillRunner} from "./polyfills/polyfill";

async function loadPolyfills() {
    await polyfillRunner();
}

async function loadApp() {
    await loadPolyfills();

    //Using require here because despite not generating
    //a new chunk (as we wish)... it will only be executed from here on
    require("./app");
}

loadApp();