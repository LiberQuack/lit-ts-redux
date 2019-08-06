import {Application} from "../core/application";
import {Counter} from "./models/counter";
import {JsonRequest} from "./models/request";

const router = new Application.Router();

router.route("home", "/", ({routeContext}) => {
    // console.log("Should load home page");
});

router.route("form", "/form-page", ({routeContext}) => {

});

router.route("counter", "/counter-page", ({app, routeContext}) => {
    if (!app.get("counter")) {
        const counter = new Counter(500);
        app.set("counter", counter);
    }
});

router.route("github", "/github-page", ({app, routeContext}) => {
    const req = new JsonRequest("https://api.github.com/search/repositories");

    app.set("req/github/repos", req);
});

router.route("about", "/about", ({routeContext}) => {
    // console.log("Should load about page");
});

router.route("404", "*", ({routeContext}) => {
    // console.log("Should load 404 page")
});

export {router};
