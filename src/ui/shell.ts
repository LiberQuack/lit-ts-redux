import "../ui/components/Toolbar";
import "../ui/components/Drawer";
import {app} from "../application/app";

app.subscribeRoutes(async routeContext => {
    switch (routeContext.alias) {
        case "form":
            console.log("Rending form page");
            return await import("./pages/FormPage");
    }
});
