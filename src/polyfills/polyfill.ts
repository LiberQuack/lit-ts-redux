import bowser from "bowser";

export async function polyfillRunner() {
    if (bowser.msie && bowser.version < 11) {
        await import("./everything");
        window.dispatchEvent(new CustomEvent("DOMContentLoaded"));
        return;
    }

    //TODO: Add polyfills by feature detection
}