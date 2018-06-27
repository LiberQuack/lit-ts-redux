import PromisePolyfill from "promise-polyfill";

(window as any).Promise = (window as any).Promise || PromisePolyfill;

export async function polyfillRunner() {
    if ('customElements' in window) {
        return console.log("CustomElements supported");
    }

    console.log("CustomElements not supported... downloading polyfills");
    await import(/* webpackChunkName: "all-polyfills" */ "./everything");
    return (window as any).dispatchEvent(new CustomEvent("DOMContentLoaded"));
}