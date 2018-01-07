import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRootReducers from '../core.reducer';
import * as fromAuthReducers from './auth.reducer';

export interface State extends fromRootReducers.State {
    auth: fromAuthReducers.AuthState;
}

export const reducers = {
    auth: fromAuthReducers.reducer
};

export const selectAuthState = createFeatureSelector<fromAuthReducers.AuthState>('auth');

export const selectAuthSignInState = createSelector(
    selectAuthState,
    (state: fromAuthReducers.AuthState) => state.auth
);

export const getLoggedIn = createSelector(
    selectAuthSignInState,
    fromAuthReducers.getLoggedIn
);

export const getUser = createSelector(
    selectAuthSignInState,
    fromAuthReducers.getUser
);

export const getSignInError = createSelector(
    selectAuthSignInState,
    fromAuthReducers.getError
);

export const getSignInLoading = createSelector(
    selectAuthSignInState,
    fromAuthReducers.getLoading
);