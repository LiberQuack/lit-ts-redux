import {Subscribable} from "../../core/subscribable";

class JsonRequest<T> extends Subscribable {

    url = "";
    method = "";
    loading = false;
    done = false;

    status: number;
    responseBody: T;
    responseHeaders: Headers;

    error = false;
    errorBody: any;

    constructor(url: string, method: "GET"|"PUT"|"DELETE"|"POST" = "GET") {
        super();
        this.url = url;
        this.method = method;
    }

    start(options?: {data:any, force: boolean}): void {

        if (this.loading) {
            console.warn("Request ongoing, you can use force if you really need");
            return;
        }

        this.loading = true;

        const headers = {
            "accept": "application/json",
            "content-type": "application/json"
        };

        fetch(this.url, {method: this.method, headers})
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

    protected registerWatchedProperties(): string[] {
        return ["loading", "done", "error", "responseBody", "errorBody", "status"];
    }

}

export {JsonRequest};
