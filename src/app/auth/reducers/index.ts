import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRootReducers from '../../core/reducers/core.reducer';

import * as fromAuthReducers from './auth.reducer';
import { State } from '../models/auth';

export interface AuthState {
    auth: State;
}

export interface State extends fromRootReducers.State {
    auth: AuthState;
}

export const reducers = {
    auth: fromAuthReducers.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthSignInState = createSelector(
    selectAuthState,
    (state: AuthState) => state.auth
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