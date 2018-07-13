export interface User {
    _id?: number;
    username: string;
    password: string;
    email: string;
    phone: string;
}

export const initialUser: User = {
    _id: 1,
    username: 'admin',
    password: '1',
    email: 'nnchau@tma.com.vn',
    phone: '0123-456-789'
};