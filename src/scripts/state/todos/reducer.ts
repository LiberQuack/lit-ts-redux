import {AnyAction} from "redux";
import {TodosActionKeys} from "./actions";
import {Todo} from "../../common/types";

export class TodoState {
    data:Array<Todo> = [
        {title: "Develop a simple todo app", done: true},
        {title: "Do lazy loading", done: true},
        {title: "Add favicon.ico", done: true},
        {title: "Add Tests", done: true},
        {title: "Add Web Manifest", done: true},
        {title: "Work offline", done: true},
        {title: "Be Responsive", done: false},
        {title: "Inline some styles", done: false},
        {title: "Take a shower", done: false},
    ];
}

const initial = new TodoState();

export const todoReducer = (state: TodoState = initial, action: AnyAction): TodoState => {
    switch (action.type) {

        case TodosActionKeys.TODOS_ADD:
            return {
                ...state,
                data: [...state.data, action.payload]
            };

        case TodosActionKeys.TODOS_REMOVE:
            return {
                ...state,
                data: state.data.filter(it => it !== action.payload)
            };

        case TodosActionKeys.TODOS_TOGGLE:
            return {
                ...state,
                data: state.data.map(it => {
                    if (it !== action.payload) {
                        return it;
                    } else {
                        return {...it, done: !it.done};
                    }
                })
            };

        default:
            return state;
    }
};
