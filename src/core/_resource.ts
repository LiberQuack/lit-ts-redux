class Resource {

    private _matcher: RegExp;
    private _name: string;

    constructor(matcher: RegExp, name: string) {
        this._matcher = matcher;
        this._name = name;
    }
}

export {Resource};
