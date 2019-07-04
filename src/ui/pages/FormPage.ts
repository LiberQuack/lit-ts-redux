import {customElement, html, LitElement, property} from "lit-element";
import {Person} from "../../application/definitions/Person";

@customElement("form-page")
class FormPage extends LitElement {

    @property()
    person = Person.build();

    //language=HTML
    protected render() {
        const {person} = this;

        return html`
            <div class="l-container l-block-center">
                <div>
                    ${person.map(field => html`
                        <input class="${field.cssState}" @change=${e => field}>
                    `)}
                    <button @click=${() => person.validate()}>Enviar</button>
                </div>
            </div>
        `
    }


    protected createRenderRoot() {
        return this;
    }
}
