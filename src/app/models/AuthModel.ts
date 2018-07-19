import { User } from '../models/UserModel';

export interface Auth {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    rememberMe: boolean;
}

export const initialAuth: Auth = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
