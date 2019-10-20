import {Subscribable} from "../../core/subscribable";


class HttpRequest<T = any> extends Subscribable {

    url = "";
    loading = false;
    done = false;
    runCounts = 0;

    opts: HttpRequestOptions;
    status: number;
    responseBody: T;
    responseHeaders: Headers;

    error = false;
    errorBody: any;

    constructor(url?: string, opts?:HttpRequestOptions) {
        super();
        this.url = url;
        this.opts = toHttpRequestOptions(opts);
    }

    run(options?: {force: boolean}): void {

        this.runCounts += 1;

        if (this.loading) {
            console.warn("Request ongoing, you can use force if you really need");
            return;
        }

        this.loading = true;

        const headers = {
            "accept": "application/json",
            "content-type": "application/json"
        };

        fetch(this.url, {method: this.opts.method, headers})
            .then(async res => {
                try {
                    const error = res.status >= 400 || res.status < 200;

                    this.status = res.status;
                    this.error = error;
                    this.responseHeaders = res.headers;
                    const isJson = /json/.test(res.headers.get("content-type"));
                    const resBody = await (isJson ? res.json() : res);

                    if (!error) {
                        this.done = true;
                        this.responseBody = resBody;
                        this.errorBody = undefined;
                    } else {
                        this.done = false;
                        this.responseBody = undefined;
                        this.errorBody = resBody;
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    this.loading = false;
                }
            });
    }

    protected _registerWatchedProperties(): string[] {
        return ["loading", "done", "error", "responseBody", "errorBody", "status", "url"];
    }

}

type HttpRequestOptions = {
    method: "GET" | "PUT" | "DELETE" | "POST" | "PATCH";
}

function toHttpRequestOptions(options): HttpRequestOptions {

    return {
        method: "GET",
        ...options
    }
}

export {HttpRequest};
