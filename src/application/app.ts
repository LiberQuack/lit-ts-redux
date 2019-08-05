import {Application} from "../core/application";
import {router} from "./router";

const app = new Application({router});

//TODO: Remove this line
(window as any).app = app;

export {app}
