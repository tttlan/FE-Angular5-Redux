import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { map } from 'rxjs/operators';
import { _throw } from "rxjs/observable/throw";
import { of } from "rxjs/observable/of";
import { HttpClient } from '@angular/common/http';

import { initialUser } from '../models/UserModel';
import {BaseService} from "./BaseService";
import { Auth } from '../models/AuthModel';
export const MOCK_USER = initialUser;
@Injectable()
export class AuthService {

    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);


    constructor(private http_base: BaseService, private http: HttpClient) {

    }

    signIn(auth: Auth): any {
        // let url = "http://localhost:5000/users/login",
        //     options = {
        //         data: {
        //             email: email,
        //             password: password
        //         }
        //     };

        // return this.http.post<Auth>(url, options);

        if (auth.email === MOCK_USER.email && auth.password === MOCK_USER.password) {
            return of(MOCK_USER);
        }

        return _throw(new Error('Invalid username or password'));
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

    login(auth: Auth) {
        return this.http.post<any>(`/users/authenticate`, { username: auth.email, password: auth.password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


}
