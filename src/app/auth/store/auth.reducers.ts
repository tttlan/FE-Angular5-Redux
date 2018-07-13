// import ui util
import { UIUtils } from '../../utils/UIUtils';

// import auth actions
import { Actions } from '../../auth/store/auth.actions';

// import auth action type
import { AuthActionTypes } from '../../shared/constants/AuthActionTypes';

// import models
import { Auth, AuthStore, initialState } from '../../models/AuthModel';
import { User } from '../../models/UserModel';


export interface AuthState {
    auth: AuthStore;
}

/**
 * Reducer function
 *
 * @function reducer
 * @param {AuthStore} state current state
 * @param {Actions} action incoming action
 */
export function reducer(state: any = initialState, action: Actions): AuthStore {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN: {
            return {
                ...state,
                error: null,
                loading: true
            };
        }

        case AuthActionTypes.SIGN_IN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: action.payload.user,
                error: null,
                loading: false
            };
        }

        case AuthActionTypes.SIGN_IN_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        }
        case AuthActionTypes.SIGN_OUT: {
            return {
                ...state,
                error: null,
                loading: true
            };
        }
        case AuthActionTypes.SIGN_OUT_SUCCESS: {
            return {
                ...state,
                loggedIn: false,
                error: null,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
}

export const getError = (state: AuthStore) => state.error;
export const getLoading = (state: AuthStore) => state.loading;
export const getLoggedIn = (state: AuthStore) => state.loggedIn;
export const getUser = (state: AuthStore) => state.user;
