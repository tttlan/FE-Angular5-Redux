export interface User {
    id?: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    token: string;
    // email: string;
    // phone: string;
}

export const initialUser: User = {
    id: 1,
    username: 'admin',
    password: '1',
    firstname: '',
    lastname: '',
    token: '',
    // email: 'sa',
    // phone: '0123-456-789'
};