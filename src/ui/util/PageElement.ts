import {ReduxLitElement} from "./ReduxLitElement";
import {RootState} from "../../scripts/state/store";

export abstract class PageElement extends ReduxLitElement {

    constructor() {
        super();
        this._visible = true;
        this._definePropertyAccessor("_visible");
        this.classList.add("l-page");
        this.classList.add("e-fade");
        this.classList.add("e-from-left");
    }

    protected abstract isVisible(state: RootState): boolean;

    protected enter() {
        this.classList.add("isVisible");
    };

    protected leave() {
        this.classList.remove("isVisible");
    };

    protected _onStoreChange(state: RootState): void {
        super._onStoreChange(state);
        const isVisible = this.isVisible(state);
        if (isVisible) {
            this.enter();
        } else {
            this.leave();
        }
        this._visible = isVisible;
    }

    _shouldRender(_props: object, _changedProps: object, _prevProps: object): boolean {
        return this._visible;
    }
}
