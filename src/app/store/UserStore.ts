import { USER_INFO } from "../shared/constants/UserInfo";
import  storage from "../utils/Storage";
import {Injectable} from "@angular/core";

@Injectable()
export class UserStore {

    constructor() {

    }


    /**
     * Set userInfo into local storage
     * @param userInfo
     * @param configName
     */
    public setUserInfo(userInfo: any, configName?: any) {
        if (configName) {
            let data: any = storage.get(USER_INFO.ALL);

            try {
                data = JSON.parse(data);
            } catch (err) {
                data = {};
            }

            data[configName] = userInfo;

            storage.set(USER_INFO.ALL, JSON.stringify(data));
        } else {
            userInfo = userInfo || "";
            storage.set(USER_INFO.ALL, JSON.stringify(userInfo));
        }
    }

    /**
     * Get userInfo from local storage
     * @param configName
     */
    public getUserInfo(configName?: any) {
        let userInfo = storage.get(USER_INFO.ALL) || "";

        try {
            userInfo = JSON.parse(userInfo);
        } catch (err) {
            userInfo = "";
        }

        return configName && userInfo ? userInfo[configName] : userInfo;
    }
}
