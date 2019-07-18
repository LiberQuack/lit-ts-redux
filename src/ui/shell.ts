import "../ui/components/Toolbar";
import "../ui/components/Drawer";
import {app} from "../application/app";

app.subscribeRoutes(async routeContext => {
    switch (routeContext.alias) {
        case "form":
            return await import("./pages/FormPage");

        case "request":
            return await import("./pages/RequestPage");

        case "counter":
            return await import("./pages/CounterPage");
    }
});
