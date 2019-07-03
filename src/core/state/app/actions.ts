import {DefaultThunkAction} from "../../common/types";

export enum AppActionKeys {
    UPDATE_LOCATION = "app_update_location",
    UI_TOGGLE_DRAWER = "app_ui_toggle_drawer",
}

export abstract class AppActions {

    static updateLocation(route, parameters, query, rawUrl): DefaultThunkAction {
        return (dispatch, getState, extraArgument) => {
            dispatch(this.toggleDrawer(false));
            dispatch({
                    type: AppActionKeys.UPDATE_LOCATION,
                    payload: {
                        route,
                        parameters,
                        query,
                        rawUrl,
                    }
                }
            )
        };
    }

    static toggleDrawer(isOpen?: boolean): DefaultThunkAction {
        return (dispatch, getState, extraArgument) => {
            const lastState = getState();
            isOpen = typeof isOpen === "boolean" ? isOpen : !lastState.app.ui.drawer_open;
            dispatch({
                    type: AppActionKeys.UI_TOGGLE_DRAWER,
                    payload: isOpen
                }
            )
        };
    }

}
