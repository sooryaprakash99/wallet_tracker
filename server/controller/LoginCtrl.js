
'use strict'

import UserAuth from "../db/UserAuth";
import UserDetails from "../db/UserDetails";

export default class LoginCtrl {
    constructor() {
    }

    loginUser(username, password) {
        let userAuth = new UserAuth();
        let userDetails = new UserDetails();
        let userObj = userAuth.find(username);
        if (userObj) {
            if (userObj.password === password) {
                let user = userDetails.find(userObj.username);
                return user;
            } else {
                return {
                    code: 401,
                    message: "Unauthorized"
                };
            }
        } else {
            return {
                code: 404,
                message: "User not found"
            }
        }
    }
}
