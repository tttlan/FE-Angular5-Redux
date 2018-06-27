import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../services/AuthService';
import { AuthActionTypes } from '../shared/constants/AuthActionTypes';
import * as fromAuthActions from '../actions/AuthAction';

// import auth action
import {
    SignInAction,
    SingInSuccessAction,
    SignInErrorAction,
    SignInRedirectAction
} from '../actions/AuthAction';
import { Auth } from '../models/AuthModel';

@Injectable()
export class AuthEffects {
    @Effect()
    signIn$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.SIGN_IN),
        map((action: fromAuthActions.SignInAction) => action.payload),
        exhaustMap((auth: Auth) =>
            this.authService
                .signIn(auth)
                .pipe(
                    map(user => new fromAuthActions.SingInSuccessAction({ user })),
                    catchError(error => of(new fromAuthActions.SignInErrorAction(error)))
                )
        )
    );

    @Effect({ dispatch: false })
    signInSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.SIGN_IN_SUCCESS),
        tap(() => this.router.navigate(['/home/dashboard']))
    );

    @Effect({ dispatch: false })
    signInRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.SIGN_IN_REDIRECT),
        tap(authed => {
            this.router.navigate(['/auth/sign-in']);
        })
    );

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
