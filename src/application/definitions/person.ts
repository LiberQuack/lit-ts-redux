import {Definition} from "../../core/_definition";

const Person = new Definition().configure((define, validate, plainObjEnricher) => {

    define("name", {
        type: String,
        pattern: /\w+ \w+/,
        required: true,
    });

    define("info.age", {
        type: Number,
        pattern: /\d{2}/,
        extraValidation: async (value: Number) => Number(value) >= 18
    });

    define("info.birth", {
        type: Date,
        extraValidation: async (value:any) => new Date(value).getSeconds() % 2 === 0
    });

    define("bank.number", {
        type: Number,
        required: true,
        pattern: /^\d{4}$/,
        plainObject: false
    });

    define("bank.digit", {
        type: Number,
        required: true,
        pattern: /^\d{1}$/,
        plainObject: false
    });

    define("country", {
        //TODO: Implement options (<select>)
    });

    validate("default", async (): Promise<boolean> => {
        return true;
    });

    validate("bank", async (model): Promise<boolean> => {
        return model.get("bank.digit") > 5;
    });

    plainObjEnricher(model => {
        return {
            "info.bank": model.get("bank.number") && model.get("bank.digit") && `${model.get("bank.number")}${model.get("bank.digit")}`
        }
    });

});

export {Person}
