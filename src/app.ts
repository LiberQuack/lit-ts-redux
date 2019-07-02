import {settings} from "./application/environment/settings";

import "./styles/styles.scss";
import "./styles/critical-path.scss";

import "./application/state/store";
import "./application/router";
import "./ui/components/Toolbar";
import "./ui/components/Drawer";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${settings.app.routes.root}service-worker.js`)
        .then(() => console.log("We work offline"));
}
