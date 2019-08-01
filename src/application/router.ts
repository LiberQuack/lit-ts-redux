import {Application} from "../core/application";
import {Counter} from "./models/counter";

const router = new Application.Router();

router.route("home", "/", ({routeContext}) => {
    // console.log("Should load home page");
});

router.route("form", "/form-page", ({routeContext}) => {

});

router.route("counter", "/counter-page", ({app, routeContext}) => {
    const counter = new Counter();
    counter.count = 500;

    app.set("counter", counter);
});

router.route("request", "/request-page", ({routeContext}) => {
    // console.log("Should load home page");
});

router.route("about", "/about", ({routeContext}) => {
    // console.log("Should load about page");
});

router.route("404", "*", ({routeContext}) => {
    // console.log("Should load 404 page")
});

export {router};
