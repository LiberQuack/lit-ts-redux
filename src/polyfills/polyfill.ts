import bowser from "bowser";

export async function polyfillRunner() {
    if (bowser.msie) {
        await import("./everything");
        return;
    }

    //TODO: Add polyfills by feature detection
}