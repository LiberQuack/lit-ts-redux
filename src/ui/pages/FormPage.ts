import {customElement, html, LitElement, property} from "lit-element";
import {Person} from "../../application/definitions/Person";

@customElement("form-page")
class FormPage extends LitElement {

    @property()
    person = Person.build();

    constructor() {
        super();
        this.person.map();
    }

    //language=HTML
    protected render() {
        const {person} = this;

        return html`
            <div class="l-container l-block-center">
                <div>
                    ${person.map(field => html`
                        <div>
                            <input class="${field.cssState}" @input=${e => field.setValue(e.target.value)}>
                        </div>
                    `)}
                    <button @click=${() => person.validate()}>Enviar</button>
                </div>
                
                
                ${JSON.stringify(person)}
                
            </div>
            
        `
    }


    protected createRenderRoot() {
        return this;
    }
}
