import {ActionPayloaded, Todo} from "../../common/types";

export enum TodosActionKeys {
    TODOS_TOGGLE = "todos_toggle",
    TODOS_ADD = "todos_add",
    TODOS_REMOVE = "todos_remove"
}

export abstract class TodosActions {

    static addTodo(todo: Todo): ActionPayloaded {
        return {
            type: TodosActionKeys.TODOS_ADD,
            payload: todo
        }
    }

    static removeTodo(todo: Todo): ActionPayloaded {
        return {
            type: TodosActionKeys.TODOS_REMOVE,
            payload: todo
        }
    }

    static toggleTodo(todo: Todo): ActionPayloaded {
        return {
            type: TodosActionKeys.TODOS_TOGGLE,
            payload: todo
        }
    }

}
