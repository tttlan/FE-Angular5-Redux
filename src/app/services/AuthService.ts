import { Injectable } from '@angular/core';
import { initialUser } from '../models/UserModel';
import { Auth } from '../models/AuthModel';
import { BaseService } from "./BaseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export const MOCK_USER = initialUser;


@Injectable()
export class AuthService extends BaseService {
    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);

    constructor() {
        super();

        this.baseUrl = this.baseUrl + '/login';
    }

    signIn(auth: Auth): any {
        return this.post<Auth>(auth);

        // if (auth.email === MOCK_USER.email && auth.password === MOCK_USER.password) {
        //     return of(MOCK_USER);
        // }

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




}
