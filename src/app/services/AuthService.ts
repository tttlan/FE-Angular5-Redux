import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { User, initialUser } from '../models/user.model';
import { Auth } from '../models/auth.model';
import {BaseService} from "./BaseService";
import sha256 from "sha256";
import {UserStore} from "../store/UserStore";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export const MOCK_USER = initialUser;

@Injectable()
export class AuthService {

    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);


    constructor(private http: BaseService, private userStore: UserStore) {
        if (this.authenticated()) {
            this.setLogin(true);
            this.setUser(this.userStore.getUserInfo());
        }

    }


    hashPassword(password: any) {
        if (!password) {
            return "";
        }
        let hashPass = sha256(password);
        return hashPass;
    }
    signIn(auth: Auth) {
        //
        // const url = "/users/login";
        // const hashPass = this.hashPassword(password);
        // const obj = {
        //     data: {
        //         email: email,
        //         password: hashPass
        //     }
        // };
        // return this.http.post(url, obj)
        //     .then((user) => {
        //         const token = user && user["token"];
        //         if (token) {
        //             this.userStore.setUserInfo(user);
        //             this.setLogin(true);
        //             this.setUser(this.userStore.getUserInfo());
        //         }
        //     });
        if (auth.username === MOCK_USER.username && auth.password === MOCK_USER.password) {
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

    /**
     * Check userInfo in local storage
     */
    authenticated() {
        if (this.userStore.getUserInfo()) {
            return true;
        }
        return false;
    }


}
