import {Application} from "../core/application";

const app = new Application();

app.route("home", "/", routeContext => {
    // console.log("Should load home page");
});

app.route("form", "/form-page", routeContext => {
    // console.log("Should load home page");
});

app.route("about", "/about", routeContext => {
    // console.log("Should load about page");
});

app.route("404", "*", routeContext => {
    // console.log("Should load 404 page")
});

//TODO: Remove this line
(window as any).app = app;

export {app}
