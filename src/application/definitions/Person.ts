import {Definition} from "../../core/definition";

const Person = new Definition().configure((define, validate) => {

    define("name", {
        type: String,
        pattern: /\w+ \w+/,
        required: true,
    });

    define("info.zipCode", {
        pattern: /\d{5}-\d{3}/
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

    define("bank.agency", {
        type: Number,
        required: true,
        pattern: /^\d{4}$/
    });

    define("bank.digit", {
        type: Number,
        required: true,
        pattern: /^\d{1}$/
    });

    /*Virtual ?*/

    /*PlainObject Modifier*/

    validate("default", async (): Promise<boolean> => {
        return true;
    });

    validate("bank", async (model): Promise<boolean> => {
        return model.get("bank.digit") > 5;
    });

});

export {Person}
