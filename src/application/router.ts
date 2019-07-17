import {Application} from "../core/application";

const router = new Application.Router();

router.route("home", "/", ({routeContext}) => {
    // console.log("Should load home page");
});

router.route("form", "/form-page", ({routeContext}) => {

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
