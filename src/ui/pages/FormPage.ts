import {customElement, html, LitElement, property} from "lit-element";
import {Person} from "../../application/definitions/Person";

@customElement("form-page")
class FormPage extends LitElement {

    @property()
    person = Person.model().subscribe(() => this.requestUpdate());

    //language=HTML
    protected render() {
        const {person} = this;

        return html`
            <div class="l-container l-block-center">
                <div>
                    ${person.map(field => html`
                        <div>
                            <div>field: ${field.name}</div>
                            <input class="${field.cssState}" @input=${e => field.setValue(e.target.value || undefined)} @blur=${e => field.validate()}>
                            <div>css:${field.cssState}</div>
                            <div>required:${field.required.toString()}</div>
                            <div>reason:${field.invalidReason}</div>
                            <div>invalid:${field.invalid}</div>
                            <div>valid:${field.valid}</div>
                            <div>dirty:${field.dirty}</div>
                        </div>
                        <br>
                    `)}
                    <button @click=${() => person.validate()}>Enviar</button>
                </div>
                               
            </div>
            
        `;
    }


    protected createRenderRoot() {
        return this;
    }
}
