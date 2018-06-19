import PromisePolyfill from "promise-polyfill";
import bowser from "bowser";

(window as any).Promise = (window as any).Promise || PromisePolyfill;

export async function polyfillRunner() {
    let version = bowser.version;

    if ((bowser.opera && version >= 41) ||
        (bowser.chrome && version >= 54) ||
        (bowser.safari && version >= 10.3)) {
        return console.log("CustomElements fully supported");
    }

    console.log("CustomElements partially or not supported");
    await import(/* webpackChunkName: "all-polyfills" */ "./everything");
    return window.dispatchEvent(new CustomEvent("DOMContentLoaded"));
}