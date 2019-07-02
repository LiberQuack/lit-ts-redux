import {AxiosInstance} from "axios";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../state/store";
import {Action, AnyAction} from "redux";

export type ThunkExtraArguments = {
    axios: AxiosInstance
}

export type Todo = {
    title: string,
    done?: boolean
};

export interface ActionPayloaded extends Action {
    payload: any
}

export type DefaultThunkAction = ThunkAction<any, RootState, ThunkExtraArguments, AnyAction>