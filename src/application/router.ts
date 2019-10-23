import {Application} from "../core/application";
import {Counter} from "./models/counter";
import {PersonDefinition} from "./definitions/person-definition";

const router = new Application.Router();

router.route("counter", "/counter-page", async ({app, routeContext}) => {
    await import("../ui/pages/counter-page");
});

router.route("form", "/form-page", async ({app, routeContext}) => {
    app.resources.set("personDefinition", PersonDefinition.model());

    await import("../ui/pages/form-page");
});

router.route("github", "/github-page", async ({app, routeContext}) => {
    await import("../ui/pages/github-page");
});

router.route("404", "*", async ({routeContext}) => {
    await import("../ui/pages/404-page");
});

export {router};
