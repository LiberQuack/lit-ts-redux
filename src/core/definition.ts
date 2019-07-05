import {Constructor} from "lit-element";

export const DefinitionCssState = {
    dirty: "isDirty",
    valid: "isValid",
    invalid: "isInvalid",
};

export class Constraints {

    type = String as Constructor<any>;
    required = undefined as boolean;
    pattern = undefined as RegExp;
    extraValidation = undefined as (value: unknown) => Promise<boolean>;

    constructor(config: Partial<Constraints>) {
        Object.assign(this, config || {});
    }

    async validate(value): Promise<string | undefined> {
        switch (true) {
            case (!this.required && (value === null || value === undefined || value === "")):
                break;

            case (this.required && (value === null || value === undefined || value === "")):
                return 'required';

            case (this.pattern && !this.pattern.test(value)):
                return 'pattern';

            case (Boolean(this.extraValidation) && !(await this.extraValidation(value))):
                return 'extra-validation'
        }
    }
}


type DefineCallback<T extends Constraints> = (
    define: (path: string, constraints: Partial<T>) => void,
    validate?: (name: string, validator: (model: Model<T>) => Promise<Boolean>) => void
) => void;

export class Definition<T extends Constraints> {

    private definitions = {} as { [path: string]: T; };
    private validators = [] as { name: string, validator: ((model: Model<T>) => Promise<boolean>) }[];
    private constraint: { new(...args): T };

    constructor(CustomConstraint?: { new(...args): T }) {
        this.constraint = (CustomConstraint || Constraints) as { new(...args): T };
    }

    configure(callback: DefineCallback<T>): Definition<T> {
        const define = (path: string, definitions: T) => {
            this.definitions[path] = new this.constraint(definitions);
        };
        const validate = (name, validator) => {
            this.validators.push({name, validator})
        };
        callback(define, validate);
        return this;
    }

    model(): Model<T> {
        return new Model(this.definitions, this.validators);
    }
}

export class Model<T extends Constraints = Constraints> {

    private listeners = [] as any[];
    private fields = [] as Field[];
    private validators = [] as { name: string, validator: ((model: Model<T>) => Promise<boolean>) }[];

    constructor(definitions: { [p: string]: T }, validators: { name: string, validator: ((model: Model<T>) => Promise<boolean>) }[]) {
        this.fields = Object.keys(definitions).map(key => {
            const field = new Field(key, definitions[key]);
            field.subscribe(() => this.runListeners());
            return field;
        });
        this.validators = validators;
    }

    load(data) {

    }

    reset() {

    }

    subscribe(changeListener: () => void): Model<T> {
        this.listeners.push(changeListener);
        return this;
    }

    async validate(): Promise<boolean> {
        const itemIsTrue = res => res === true;

        const fieldValidations = await Promise.all(this.fields.map(field => field.validate()));
        if (!fieldValidations.every(itemIsTrue)) {
            return false;
        }

        const modelValidations = await Promise.all(this.validators.map(it => it.validator(this)));
        return modelValidations.every(itemIsTrue);
    }

    map(callback: (field: Field, index: number) => any): any[] {
        return this.fields.map(callback);
    }

    private runListeners() {
        this.listeners.forEach(callback => callback(this));
    }

}

const primitivesProtos = [String, Number, Boolean, Symbol].map(it => it.prototype);
const isPrimitive = (constructor) => primitivesProtos.indexOf(constructor.prototype) > -1;

export class Field<T extends Constraints = Constraints> {

    private _value;
    private _invalidReason = undefined;
    private _invalid = undefined;
    private _valid = undefined;
    private _name: string;
    private _dirty = undefined;
    private constraint = undefined as T;
    private listeners = [] as Array<(field: Field) => void>;

    constructor(path: string, constraints: T) {
        this._name = path;
        this.constraint = constraints;
    }

    get name() {
        return this._name;
    }

    get value() {
        if (this._value !== undefined) {
            if (isPrimitive(this.constraint.type)) {
                return (this.constraint.type as any)(this._value);
            } else {
                return new this.constraint.type(this._value)
            }
        }
    }

    get invalid() {
        return this._invalid;
    }

    get invalidReason() {
        return this._invalidReason;
    }

    get valid() {
        return this._valid;
    }

    get dirty() {
        return this._dirty;
    }

    get required() {
        return Boolean(this.constraint.required);
    }

    get cssState(): string {
        const dirty = this._dirty && DefinitionCssState.dirty;
        const invalid = this._invalid && DefinitionCssState.invalid;
        const valid = this._valid && DefinitionCssState.valid;
        return `${dirty || ""} ${invalid || ""} ${valid || ""}`.trim();
    }

    setValue(value: any) {
        this._value = value;
        this.setDirty(true);
        this.runListeners();
    }

    subscribe(changeListener: ((field: Field) => void)) {
        this.listeners.push(changeListener);
    }

    prune() {
        this._invalid = undefined;
        this._valid = undefined;
        this._invalidReason = undefined;
        this.runListeners();
    }

    setDirty(toggle: boolean) {
        this._dirty = toggle;
        this.runListeners();
    }

    setInvalid(toggle: boolean) {
        this._invalid = toggle;
        this._valid = !toggle;
        this.runListeners();
    }

    setValid(toggle: boolean) {
        this._valid = toggle;
        this._invalid = !toggle;
        this.runListeners();
    }

    async validate(): Promise<boolean> {
        try {
            this._invalidReason = await this.constraint.validate(this.value);
            const isValid = !Boolean(this._invalidReason);
            this.setValid(isValid);
            return isValid;
        } catch (error) {
            console.warn(`Error when validating field ${(this.name || "").toUpperCase()}\n`, error, this);
            this._invalidReason = `unknown error`;
            this.setInvalid(true);
            return false;
        }
    }

    private runListeners() {
        this.listeners.forEach(listener => listener(this));
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
