import { AnyAction } from "redux";
import {AppActionKeys} from "./actions";

export class AppState {
    location = {
        route: "/",
        parameters: {},
        query : {},
        rawUrl: "/",
    }
}

export const appReducer = (state = new AppState(), action:AnyAction):AppState => {
    switch (action.type) {

        case AppActionKeys.UPDATE_LOCATION:
            return {...state, location: action.payload};

        default:
            return state;

    }
};
