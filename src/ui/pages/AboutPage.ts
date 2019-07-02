import {html} from "@polymer/lit-element";
import {PageElement} from "../util/PageElement";
import {RootState} from "../../application/state/store";
import {settings} from "../../application/environment/settings";

class AboutPage extends PageElement {

    seconds = 0;

    static get properties() {
        return {
            seconds: Number
        }
    }

    _render(props) {
        //language=HTML
        return html`
            <div class="l-container">
                <section class="about">
                    <h2>Developed by Mr. Quack</h2>
                    <p class="l-text-underline">Web Components ♥</p>
                    <p>About page running for ${props.seconds}s</p>
                </section>
            </div>
        `;
    }

    _firstRendered(): void {
        setInterval(() => {
            this.seconds++;
        }, 1000);
    }

    stateReceiver(state: RootState): void {}

    protected _createRoot(): Element | DocumentFragment {
        return this;
    }

    protected isVisible(state: RootState): boolean {
        return state.app.location.route == settings.app.routes.about;
    }
}

customElements.define("about-page", AboutPage);

export {AboutPage}
