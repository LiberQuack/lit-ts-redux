import {Constructor} from "lit-element";

export const DefinitionCssState = {
    dirty: "isDirty",
    valid: "isValid",
    invalid: "isInvalid",
};

export class Constraints {

    type = String                as Constructor<any>;
    required = false             as boolean;
    pattern = undefined          as RegExp;
    extraValidation = undefined  as (model: Model) => Promise<boolean>;

    constructor(config: Partial<Constraints>) {
        Object.assign(this, config || {});
    }
}

export class Definition<T extends Constraints> {

    private definitions = {} as { [path: string]: T; };
    private constraint: {new(...args): T};

    constructor(CustomConstraint?: {new(...args): T}) {
        this.constraint = (CustomConstraint || Constraints) as {new(...args): T};
    }

    build(): Model<T> {
        return new Model(this.definitions);
    }

    configure(callback: (define: (path: string, constraints: Partial<T>) => void) => void): Definition<T> {
        callback(this.define.bind(this));
        return this;
    }


    define(path: string, definitions: T): void {
        this.definitions[path] = new this.constraint(definitions);
    }


}

export class Field<C extends Constraints = Constraints> {

    constructor(definitions: C) {

    }

    get cssState(): string {
        return ""
    }

    setValue(value: any) {

    }

}

export class Model<T extends Constraints = Constraints> {

    private fields = [] as Field[];

    constructor(definitions: { [path: string]: T; }) {
        this.fields = Object.keys(definitions).map(key => new Field(definitions[key]));
    }

    load(data) {

    }

    reset() {

    }

    async validate(): Promise<boolean> {
        return false
    }

    map(callback: (field: Field, index: number) => any): any[] {
        return this.fields.map(callback);
    }

}


// "isReadOnly": undefined,
// "isVisible": undefined,
// "normalize": undefined,
// "extraValidation": undefined,
// "hookOnSave": undefined
// "label": "Gênero",
// "section": "personal-data",
// "dataType": "text",
// "validationMessage": "Informe gênero",
// "tip": undefined,
// "product": ["CP", "HE", "Refin"],
// "isMandatory": (application) => { if (application.product === "Refin" || application.product === "CP") { return true } else { return false } },
// "inputType": "select",
// "inputProps": {
//     "domainName": undefined,
//     "filteredFrom": undefined,
//     "options": [{ "code": "m", "description": "Masculino" }, { "code": "f", "description": "Feminino" }],
//     "maxValue": undefined,
//     "minValue": undefined,
//     "maxSize": undefined,
//     "minSize": undefined,
//     "autoComplete": undefined,
//     "mask": undefined,
//     "removeMask": undefined
// },
