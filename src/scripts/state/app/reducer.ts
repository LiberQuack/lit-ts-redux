import {AnyAction} from "redux";
import {AppActionKeys} from "./actions";

export class AppState {
    ui = {
        drawer_open: false,
    };

    location = {
        route: "/",
        parameters: {},
        query: {},
        rawUrl: "/",
    }
}

export const appReducer = (state = new AppState(), action: AnyAction): AppState => {
    switch (action.type) {

        case AppActionKeys.UPDATE_LOCATION:
            return {...state, location: action.payload};

        case AppActionKeys.UI_TOGGLE_DRAWER:
            return {...state, ui: {...state.ui, drawer_open: action.payload}};

        default:
            return state;

    }
};
