import {
    HttpHandler, HttpInterceptor, HttpRequest,
    HttpEvent
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(JSON.stringify(req));

        let token: string;
        if (token) {
            req = req.clone({headers: req.headers.set('Authorization', 'Bearer' + token)});
        }

        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }
        req = req.clone({
            headers: req.headers.set('Accept', 'application/json')
        });
        return next.handle(req);
    }

}
