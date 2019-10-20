import {Application} from "../core/application";
import {Counter} from "./models/counter";

const router = new Application.Router();

router.route("form", "/form-page", async ({routeContext}) => {
    await import("../ui/pages/form-page");
});

router.route("counter", "/counter-page", async ({app, routeContext}) => {
    if (!app.get("counter")) {
        const counter = new Counter(500);
        app.set("counter", counter);
    }

    await import("../ui/pages/counter-page");
});

router.route("github", "/github-page", async ({app, routeContext}) => {
    await import("../ui/pages/github-page");
});

router.route("404", "*", async ({routeContext}) => {
    await import("../ui/pages/404-page");
});

export {router};
