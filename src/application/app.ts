import {Application} from "../core/application";
import {router} from "./router";

const app = new Application({router});

try {
    // @ts-ignore
    let middleware1 = (resourceMiddleware) => {};
    let middleware2 = () => {};

    app.resource(/\/github/i, middleware1, middleware2)
} catch (e) {

}

//TODO: Remove this line
(window as any).app = app;

export {app}
