import {ActionPayloaded} from "../../common/types";

export enum AppActionKeys {
    UPDATE_LOCATION = "app_update_location",
}

export abstract class AppActions {

    static updateLocation(route, parameters, query, rawUrl): ActionPayloaded {
        return {
            type: AppActionKeys.UPDATE_LOCATION,
            payload: {
                route,
                parameters,
                query,
                rawUrl,
            }
        }
    }

}
