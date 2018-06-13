//TODO: Add tests for this mixin
export default (baseClass) => class ModelHandlerMixin extends baseClass {

    set = (function (path: string, elmProperty: string /*TODO: Could receive a callback function (also as second argument)*/) {
        return ((e) => this._safelySetPropValue(path.split('.'), e.currentTarget[elmProperty]));
    }).bind(this);

    get = (function (path: string) {
        return this._safelyNavigate(path.split('.'), this)
    }).bind(this);

    _safelyNavigate(paths: Array<any>, object?:Object) {
        if (object === undefined || object === null || paths.length < 1) return object;
        const pathHead = paths.shift();
        return this._safelyNavigate(paths, object[pathHead])
    }

    _safelySetPropValue(paths: Array<any>, value, model?:Object) {
        let object = model || this;

        if (paths.length > 1) {
            const pathHead = paths.shift();
            object[pathHead] = typeof object[pathHead] === "object" ? object[pathHead] : {};
            return this._safelySetPropValue(paths, value, object[pathHead])
        } else {
            return object[paths.shift()] = value;
        }
    }

}
