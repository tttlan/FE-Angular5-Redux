import { Injectable } from '@angular/core';
import { initialUser } from '../models/user.model';
import { Auth } from '../models/auth.model';
import {BaseService} from "./BaseService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GlobalApp} from "../utils/GlobalApps";
export const MOCK_USER = initialUser;
@Injectable()
export class AuthService {

    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);


    constructor(private http: BaseService, private helper: GlobalApp) {
        if (this.authenticated()) {
            this.setLogin(true);
            this.setUser(this.helper.getCurrentUser());
        }
    }

    signIn(auth: Auth) {

        const url = "http://localhost:5000/users/login",
        options = {
                username: auth.username,
                password: auth.password
            };
        return this.http.post<Auth>(url, options)
            .then((user) => {
                const token = user && user["token"];
                if (token) {
                    this.helper.setCurrentUser(user);
                    this.setLogin(true);
                    this.setUser(this.helper.getCurrentUser());
                }
            });
        // if (auth.username === MOCK_USER.username && auth.password === MOCK_USER.password) {
        //     return of(MOCK_USER);
        // }
        //
        // return _throw(new Error('Invalid username or password'));
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

    /**
     * Check userInfo in local storage
     */
    authenticated() {
        if (this.helper.getCurrentUser()) {
            return true;
        }
        return false;
    }


}
