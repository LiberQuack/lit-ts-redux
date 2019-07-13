import {Application} from "../core/application";
import {router} from "./_router";

const app = new Application({
    router
});

//TODO: Remove this line
(window as any).app = app;

export {app}
