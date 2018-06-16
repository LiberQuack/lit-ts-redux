import page from "page";
import {appState} from "./state/store";
import {settings} from "./environment/settings";
import {AppActions} from "./state/app/actions";
import Context = PageJS.Context;
import {queryObjectMiddeware} from "./common/query-object-middleware";

function setAppState(route, req: Context) {
    appState.dispatch(AppActions.updateLocation(route, req.params, req.query, req.path));
}

const routes = settings.app.routes;

page("*", queryObjectMiddeware);

page(routes.root, async (req) => {
    setAppState(routes.root, req);
    await import("../ui/pages/TodosPage");
});

page(routes.about, async (req) => {
    setAppState(routes.about, req);
    await import("../ui/pages/AboutPage")
});

page.start();