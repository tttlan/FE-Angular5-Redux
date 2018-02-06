import {Injectable} from "@angular/core";
import {HTTP_VERBS} from "../shared/constants/HttpRequest";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import * as _ from "lodash";
import {NavigationStart, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ApiHelpers} from "../utils/ApiHelpers";

@Injectable()
export class BaseService {

    private httpVerbs = HTTP_VERBS;
    private subject = new Subject<any>();

    constructor(private http: HttpClient, private router: Router, private apiHelper: ApiHelpers) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.subject.next({type: null, text: null});
            }
        });
    }

    /**
     * set Message response
     * @param response
     */
    setMessage(response: any) {
        this.subject.next({type: response.type, text: response.message});
    }

    get<T>(url: string, options: any = {}) {
        let method = this.httpVerbs.GET;
        url = this.apiHelper.buildQueryString(url, options);
        return this.async<T>(method, url, null);
    }

    post<T>(url: any, options: any) {
        let retryOptions = {
            url: url,
            options: options
        };
        let method = this.httpVerbs.POST,
            body = {};
        body["data"] = options.data;
        body["items"] = options.items;
        body["meta"] = {
            "type" : options.meta
        };
        options.body = _.cloneDeep(body);
        try {
            body = JSON.stringify(body, (key, value) => {
                if (value === undefined) {
                    return null;
                }
                return value;
            });
        } catch (err) {
            body = null;
        }
        return this.async<T>(method, url, body);
    }

    put<T>(url: any, options: any) {
        let method = this.httpVerbs.PUT,
            body = {};

        body["data"] = options.data;


        try {
            body = JSON.stringify(body, (key, value) => { if (value === undefined) { return null; } return value; });
        } catch (err) {
            body = null;
        }

        return this.async<T>(method, url, body);
    }

    delete<T>(url: any, options: any) {
        let method = this.httpVerbs.DELETE;
        return this.async<T>(method, url, null);
    }

    async<T>(method: any, url: any, body: any) {
        return this.http[_.lowerCase(method)](url, (method === HTTP_VERBS.POST) || (method === HTTP_VERBS.PUT) ? body : null).subscribe((res: any) => {
                let data;
                try {
                    data = JSON.parse(res._body);
                } catch (err) {
                    return err;
                }
            }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log(err.error.message);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            }
        );
    }
}
