import thunk from 'redux-thunk';
import {customAxios} from "../common/custom-axios";
import {AnyAction, applyMiddleware, combineReducers, compose, createStore} from 'redux';

import {appReducer as app, AppState} from "./app/reducer";
import {DefaultThunkAction} from "../common/types";
import {todoReducer as todo, TodoState} from "./todos/reducer";
import {loadState, saveState} from "./state-saver";

export type RootState = {
    todo: TodoState,
    app: AppState
}

const reducers = combineReducers<RootState, AnyAction>({
    app,
    todo
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({axios: customAxios}))
);

const store = createStore<RootState, AnyAction, {dispatch: (action: DefaultThunkAction) => {}}, {}>(
    reducers,
    loadState(),
    enhancer
);

//Save redux to localStorage
store.subscribe(() => {
    const state = store.getState();
    const offlineState = <RootState>{
        todo: state.todo
    };
    saveState(offlineState);
});

export {store as appState};