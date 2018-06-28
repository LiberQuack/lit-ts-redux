import {settings} from "./scripts/environment/settings";

import "./styles/styles.scss";
import "./styles/critical-path.scss";

import "./scripts/state/store";
import "./scripts/router";
import "./ui/components/Toolbar";
import "./ui/components/Drawer";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${settings.app.routes.root}sw.js`)
        .then(() => console.log("We work offline"));
}