import bowser from "bowser";

//TODO: Add polyfills by feature detection

if (bowser.msie) {
    import("./polyfills/everything");
    return
}