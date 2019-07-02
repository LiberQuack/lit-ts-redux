import {LitElement} from "@polymer/lit-element";
import {appState, RootState} from "../../application/state/store";

export abstract class ReduxLitElement extends LitElement {

    connectedCallback() {
        super.connectedCallback();
        this._onStoreChange(appState.getState());
        this.__unsubscribe = appState.subscribe(() => this._onStoreChange(appState.getState()));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.__unsubscribe();
        super.disconnectedCallback && super.disconnectedCallback();
    }

    protected _onStoreChange(state: RootState): void {
        this.stateReceiver(state);
    }

    abstract stateReceiver(state: RootState): void;

}
