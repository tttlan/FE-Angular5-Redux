import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { map, tap, catchError, exhaustMap} from 'rxjs/operators';

import { AuthService } from '../../services/AuthService';
import { AuthActionTypes } from '../../shared/constants/AuthActionTypes';
import * as fromAuthActions from './auth.actions';

// import auth action
import {
    SignInAction,
    SingInSuccessAction,
    SignInErrorAction,
    SignInRedirectAction
} from './auth.actions';
import { Auth } from '../../models/AuthModel';
import { User } from '../../models/UserModel';

@Injectable()
export class AuthEffects {
    @Effect()
    signIn$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN)
        .pipe(map((action: fromAuthActions.SignInAction) => {
            return action.payload;
        })
        , exhaustMap((auth: Auth) => 
            this.authService.signIn(auth)
            .pipe(
                map((user: User) => new fromAuthActions.SingInSuccessAction({ user })),
                catchError(error => of(new fromAuthActions.SignInErrorAction(error)))
                )
            )
        );

    @Effect({dispatch: false})
    signInSuccess$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_SUCCESS)
        .pipe(tap(() => {
            this.router.navigate(['/admin/dashboard']);
        }));

    @Effect({dispatch: false})
    signInRedirect$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_REDIRECT)
        .pipe(tap(authed => {
            this.router.navigate(['/sign-in']);
        }));

    @Effect()
    signOut$ = this.actions$
        .ofType(AuthActionTypes.SIGN_OUT)
        .pipe(map(
            () => new fromAuthActions.SignOutAction
        ),
        map(
            () => new fromAuthActions.SignOutSuccessAction
        ));
    

    /**
     * @constructor
     * @param {Actions} actions
     * @param {AuthService} authService
     * @param {Router} router
     */
    constructor(private actions$: Actions,
                private authService: AuthService,
                private router: Router) {
    }
}
