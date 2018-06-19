import {html, LitElement} from "@polymer/lit-element";
import classnames from "classnames";

class TodoItem extends LitElement {

    title: string;
    done: boolean;
    inited = false;

    static get properties() {
        return {
            title: String,
            done: Boolean,
            inited: Boolean,
        }
    }

    _render(props) {
        //language=HTML
        return html`
            <style>
                .item {
                    background: #474357;
                    padding: 10px 15px;
                    border-radius: 3px;
                    margin-top: 5px;
                    display: flex;
                    cursor: pointer;
                    transition: .5s;
                    opacity: 1;
                    transform: translate(0)
                }
                
                .item.isNotInited {
                    opacity: 0;
                    transform: translateY(-15px);
                }
                
                .item--content {
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                
                .item--content.isDone {
                    text-decoration: line-through;
                }
                
                .item--menu {
                    flex-grow: 0;
                    flex-shrink: 0;
                }
                
                .action {
                    text-decoration: underline;
                }
            </style>
            
            <div class$="item ${classnames({isNotInited: !this.inited})}">
                <div class$="item--content ${classnames({isDone: this.done})}">
                    <slot></slot>
                </div>
                <div class="item--menu">
                    <span class="action" on-click="${this.dispatchDelete.bind(this)}">Delete</span>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.dispatchDone.bind(this));
    }

    _firstRendered(): void {
        setTimeout(() => this.inited = true, 150);
    }

    protected dispatchDelete() {
        console.log('Delete todo', this.title);
        this.dispatchEvent(new CustomEvent("delete"));
    }

    protected dispatchDone(e:Event) {
        if (e.target === this.shadowRoot.querySelector('.action')) return;
        console.log('Complete todo', this.title);
        this.dispatchEvent(new CustomEvent("done-toggle"));
    }
}

customElements.define("todo-item", TodoItem);

export {TodoItem}