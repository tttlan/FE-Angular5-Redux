import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { User, initialUser } from '../models/user.model';
import { Auth } from '../models/auth.model';

export const MOCK_USER = initialUser;

@Injectable()
export class AuthService {
    signIn(auth: Auth) {
        if (auth.username === MOCK_USER.username && auth.password === MOCK_USER.password) {
            return of(MOCK_USER);
        }

        return _throw(new Error('Invalid username or password'));
    }
}