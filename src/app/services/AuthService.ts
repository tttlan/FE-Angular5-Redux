import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { initialUser, User } from '../models/UserModel';
import { Auth } from '../models/AuthModel';
import { BaseService } from "./BaseService";
import { BehaviorSubject, of, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http';

export const MOCK_USER = initialUser;


@Injectable()
export class AuthService extends BaseService {
    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);

    constructor(http: HttpClient) {
        super(http);

        this.baseUrl = this.baseUrl + '/login';
    }

    signIn(auth: Auth): Observable<User> {
        // if (auth.email === MOCK_USER.email && auth.password === MOCK_USER.password) {
        //     return of(MOCK_USER);
        // }

        // return throwError(new Error('Invalid username or password'));
        return this.post<Auth>(auth);
    }

    /**
     * Set login status
     * @param status
     */
    setLogin(status: any) {
        this.isLogin.next(status);
        this.isLogin.asObservable();
    }

    /**
     * Set user when login
     * @param user
     */
    setUser(user: any) {
        this.user.next(user);
        this.user.asObservable();
    }




}
