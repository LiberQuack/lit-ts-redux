import Esr from "esr/src/index"; //TODO: Find smaller router

import "./_anchor-pushstate.ts";
import {appState} from "./state/store";
import {AppActions} from "./state/app/actions";
import {settings} from "./environment/settings";

const router = new Esr();
const routes = settings.app.routes;

function setAppState(route, req) {
    const {pathname, search} = router.getCurrentLocation();
    appState.dispatch(AppActions.updateLocation(route, req.params || {}, req.queries, `${pathname}${search}`));
}

router.on(routes.root, async (req) => {
    setAppState(routes.root, req);
    await import("../ui/pages/TodosPage");
});

router.on(routes.about, async (req) => {
    setAppState(routes.about, req);
    await import("../ui/pages/AboutPage")
});

router.start();