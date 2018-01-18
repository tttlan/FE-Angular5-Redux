import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes } from '../shared/constants/AuthActionTypes';
import * as fromAuthActions from '../actions/auth.action';

// import auth action
import {
    SignInAction,
    SingInSuccessAction,
    SignInErrorAction,
    SignInRedirectAction
} from '../actions/auth.action';

@Injectable()
export class AuthEffects {
    @Effect()
    signIn$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN)
        .map((action: fromAuthActions.SignInAction) => action.payload)
        .exhaustMap(auth => this.authService
            .signIn(auth)
            .map(user => new fromAuthActions.SingInSuccessAction({ user }))
            .catch(error => of(new fromAuthActions.SignInErrorAction(error)))
        );

    @Effect({dispatch: false})
    signInSuccess$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_SUCCESS)
        .do(() => this.router.navigate(['/home/dashboard']));

    @Effect({dispatch: false})
    signInRedirect$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_REDIRECT)
        .do(authed => {
            this.router.navigate(['/auth/sign-in']);
        });

    /**
     * @constructor
     * @param {Actions} actions
     * @param {AuthService} authService
     * @param {Router} router
     */
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }
}