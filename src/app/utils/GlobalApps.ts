import { UIUtils } from './UIUtils';
import * as CryptoJS from 'crypto-js';

export class GlobalApp {
    private _user: any = null;
    private _sessionStorageAllowed: boolean = true;
    private _secretKey: string = 'qt';
    private _globalInfo: string = null;
    private _uiutils = new UIUtils();

    encryptValue(value: string): string {
        if (!this._uiutils.isNullOrUndefined(value)) {
            try {
                return CryptoJS.AES.encrypt(JSON.stringify(value), this._secretKey);
            } catch (err) {
                console.log('encryptValue' , err);
            }
        } else {
            return value;
        }
    }

    decryptValue(value: string): string {
        if (!this._uiutils.isNullOrUndefined(value)) {
            try {
                return CryptoJS.AES.encrypt(JSON.stringify(value), this._secretKey);
            } catch (err) {
                console.log('decryptValue' , err);
            }
        } else {
            return value;
        }
    }

    setCurrentUser(user: any) {
        this._user = this.encryptValue(user);

        if (this._sessionStorageAllowed) {
            try {
                if (!this._uiutils.isNullOrUndefined(user)) {
                    sessionStorage.setItem('authService', this.encryptValue(user));
                } else {
                    sessionStorage.removeItem('authService');
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('setCurrentUser' , err);
            }
        }
    }

    getCurrentUser(): any {
        if (this._uiutils.isNullOrUndefined(this._user)) {
            try {
                if (this._sessionStorageAllowed) {
                    let authService = sessionStorage.getItem('authService');

                    if (!this._uiutils.isNullOrUndefined(authService)) {
                        this._user = authService;
                    }
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('getCurrentUser' , err);
            }
        }

        return this.decryptValue(this._user);
    }

    setSecretKey(newKey: string): void {
        this._secretKey = newKey;

        if (this._sessionStorageAllowed) {
            try {
                if (!this._uiutils.isNullOrUndefined(newKey)) {
                    sessionStorage.setItem('secretKey', JSON.stringify(newKey));
                } else {
                    sessionStorage.removeItem('secretKey');
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('setSecretKey' , err);
            }
        }
    }

    getSecretKey(): string {
        if (this._uiutils.isNullOrUndefined(this._secretKey)) {
            if (this._sessionStorageAllowed) {
                try {
                    let secretKey = sessionStorage.getItem('secretKey');

                    if (!this._uiutils.isNullOrUndefined(secretKey)) {
                        this._secretKey = secretKey;
                    }
                } catch (err) {
                    this._sessionStorageAllowed = false;

                    console.log('getSecretKey' , err);
                }
            }

            return this._secretKey;
        }
    }

    setGlobalInfo(globalInfo: string): void {
        this._globalInfo = this.encryptValue(globalInfo);
        if (this._sessionStorageAllowed === true) {
            try {
                if (!this._uiutils.isNullOrUndefined(globalInfo)) {
                    sessionStorage.setItem('globalInfo', this.encryptValue(globalInfo));
                } else {
                    sessionStorage.removeItem('globalInfo');
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('setGlobalInfo' , err);
            }
        }
    }

    getGlobalInfo(): string {
        if (this._uiutils.isNullOrUndefined(this._globalInfo)) {
            if (this._sessionStorageAllowed) {
                try {
                    let globalInfo = sessionStorage.getItem('globalInfo');

                    if (!this._uiutils.isNullOrUndefined(globalInfo)) {
                        this._globalInfo = globalInfo;
                    }
                } catch (err) {
                    this._sessionStorageAllowed = false;

                    console.log('getGlobalInfo' , err);
                }
            }

            return this._globalInfo;
        }
    }

    getPermission(): Array<any> {
        let user = this.getCurrentUser();

        if (!this._uiutils.isNullOrUndefined(user)) {
            return user.permissions;
        } else {
            return [];
        }
    }
}