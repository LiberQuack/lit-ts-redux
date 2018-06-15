import bowser from "bowser";
import "core-js/es6/promise";

export async function polyfillRunner() {
    if (bowser.msie && bowser.version <= 11) {
        await import("./everything");
        window.dispatchEvent(new CustomEvent("DOMContentLoaded"));
        return;
    }

    //TODO: Add polyfills by feature detection

    //TODO: IE < 11... show browser not supported... throw error
}