import page from "page";
import {appState} from "./state/store";
import {settings} from "./environment/settings";
import {AppActions} from "./state/app/actions";
import {queryObjectMiddeware} from "./common/query-object-middleware";
import Context = PageJS.Context;

function setAppState(route, req: Context) {
    appState.dispatch(AppActions.updateLocation(route, req.params, req.query, req.path));
}

const routes = settings.app.routes;

page("*", queryObjectMiddeware);

page(routes.root, async (req) => {
    setAppState(routes.root, req);
    await import(/* webpackChunkName: "TodosPage" */ "../ui/pages/TodosPage");
});

page(routes.about, async (req) => {
    setAppState(routes.about, req);
    await import(/* webpackChunkName: "AboutPage" */ "../ui/pages/AboutPage");
});

page.start();