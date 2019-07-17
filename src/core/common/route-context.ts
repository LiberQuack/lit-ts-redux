import Context = PageJS.Context;
import {Application} from "../application";

export class RouteContext {

    /**
     * alias for the route
     *  home  -> /
     *  about -> /about
     */
    alias: string;

    /**
     * query object
     */
    query: { [x: string]: string };

    /**
     * url path not containing queries or hash
     *  /about
     *  /blog
     */
    path: string;

    /**
     * hash of the url (do not contain #)
     */
    hash: string;

    /**
     * query string
     *  ?foo=bar
     */
    rawQuery: string;

    /**
     * complete path (discarding base)
     *  /about?foo=bar#important
     */
    rawUrl: string;

    constructor(alias: string, pageRouteContext: Context) {
        this.alias = alias;
        this.query = pageRouteContext.query;
        this.path = pageRouteContext.pathname;
        this.hash = pageRouteContext.hash;
        this.rawQuery = pageRouteContext.querystring;
        this.rawUrl = pageRouteContext.path;
    }
}
