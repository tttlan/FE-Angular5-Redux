import { Injectable } from '@angular/core';
import { initialUser } from '../models/UserModel';
import { Auth } from '../models/AuthModel';
import {BaseService} from "./BaseService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {_throw} from "rxjs/observable/throw";
import {of} from "rxjs/observable/of";
export const MOCK_USER = initialUser;
@Injectable()
export class AuthService {

    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);


    constructor(private http: BaseService) {

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




}
