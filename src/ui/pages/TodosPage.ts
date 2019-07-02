import {html} from "@polymer/lit-element";
import {appState, RootState} from "../../application/state/store";
import {TodosActions} from "../../application/state/todos/actions";
import {Todo} from "../../application/common/types";
import ModelHandlerMixin from "../util/ModelHandlerMixin";

import "../components/TodoItem";
import {PageElement} from "../util/PageElement";
import {settings} from "../../application/environment/settings";

class TodosPage extends ModelHandlerMixin(PageElement) {

    todoInput = "";
    _todos: Array<Todo> = [];

    static get properties() {
        return {
            todoInput: String,
            _todos: Array
        }
    }

    _render(props) {
        //language=HTML
        return html`
            <section class="todos l-container">
                <form class="form" on-submit="${this.addTodo.bind(this)}">
                    <input class="todos--input form--floatinput l-width-100" 
                           placeholder="My todo is..."
                           aria-label="Todo input text field"
                           on-input="${this.set('todoInput', 'value')}"
                           on-keydown="${this.set('todoInput', 'value')}">
                </form>
                <ul class="todos--items">
                    ${this._todos.map(todo => (html`
                        <li>
                            <todo-item done="${todo.done}"
                                       on-done-toggle="${() => this.toggleTodo(todo)}"
                                       on-delete="${() => this.removeTodo(todo)}">${todo.title}</todo-item>
                        </li>`
                    ))}
                </ul>
            </section>
        `;
    }

    protected _createRoot() {
        return this;
    }

    protected stateReceiver(state: RootState): void {
        this._todos = state.todo.data;
    }

    protected isVisible(state: RootState): boolean {
        return state.app.location.route == settings.app.routes.root;
    }

    protected addTodo(e: Event) {
        e.preventDefault();
        const title = this.todoInput;
        if (!title) return console.log("No value to add todo");
        appState.dispatch(TodosActions.addTodo({title, done: false}));
        this.querySelector("form").reset();
    }

    protected removeTodo(todo: Todo) {
        appState.dispatch(TodosActions.removeTodo(todo));
    }

    protected toggleTodo(todo: Todo) {
        appState.dispatch(TodosActions.toggleTodo(todo));
    }
}

customElements.define("todos-page", TodosPage);

export {TodosPage}
