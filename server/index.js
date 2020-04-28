import UserExpenses from "./db/UserExpenses";
import UserAuth from "./db/UserAuth";
import UserDetails from "./db/UserDetails";

let walletObj =  {
    "id": 146,
    "user_id": 2,
    "date": "26-05-2020",
    "description": "Paytm casgback",
    "type": "income",
    "amount": 360
}

let UserExpenses1 = new UserExpenses();
UserExpenses1.createUserDetails(walletObj);

let UserAuth1 = new UserAuth();
let userDetail = UserAuth1.findById("nelson@yahoo.com")
console.log("The user detal is:::::::::::::", userDetail);

let UserExpenses2 = new UserExpenses();
let details = UserExpenses2.getExpenseDetailsByUser(walletObj.user_id);
