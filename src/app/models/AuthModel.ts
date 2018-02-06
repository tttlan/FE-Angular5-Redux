import { User } from '../models/UserModel';

export interface Auth {
    username: string;
    password: string;
    rememberMe: boolean;
}

export const initialAuth: Auth = {
    username: '',
    password: '',
    rememberMe: false
};

/**
* AuthStore
*
* @interface State
*/
export interface AuthStore {
    loggedIn: boolean;
    user: User | null;
    error: any | null;
    loading: boolean;
}

export const initialState: AuthStore = {
    loggedIn: false,
    user: null,
    error: null,
    loading: false
};
