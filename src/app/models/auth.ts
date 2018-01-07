import { User } from '../models/users';

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
* State
* 
* @interface State
*/
export interface State {
    loggedIn: boolean;
    user: User | null;
    error: any | null;
    loading: boolean;
}

export const initialState: State = {
    loggedIn: false,
    user: null,
    error: null,
    loading: false
};