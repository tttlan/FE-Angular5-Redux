import {
    HttpHandler, HttpInterceptor, HttpRequest,
    HttpEvent, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { GlobalApp } from "./GlobalApps";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private globalApp: GlobalApp) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(JSON.stringify(req));
        const started = Date.now();
        let reqOptions = {},
            headers,
            token;
        if (req.body.email && req.body.password) {
            let password = this.globalApp.hassPassword(req.body.password);

            headers = this.globalApp.getHeader(req.method, req.url, req.body.email, password, req.body);
            token = req.body.email;
        } else {

        }
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }
        req = req.clone({
            headers: req.headers.set('Accept', 'application/json')
        });
        return next.handle(req)
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log("Date :", new Date().toDateString());
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        //navigate the user to login route
                        //remove the token from the localStorage
                    }
                }
            });
    }


}
