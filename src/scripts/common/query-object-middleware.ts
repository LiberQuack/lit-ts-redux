import Context = PageJS.Context;
import Callback = PageJS.Callback;

export const queryObjectMiddeware: Callback = (req: Context, next: () => any) => {
    req.query = req.querystring.split("&").reduce((resultSoFar, part) => {
        const match = /(.+?\b)=?(.*)/.exec(part);
        if (match) resultSoFar[match[1]] = match[2];
        return resultSoFar;
    }, {});
    return next();
};