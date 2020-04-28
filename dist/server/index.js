"use strict";

var _UserExpenses = _interopRequireDefault(require("./db/UserExpenses"));

var _UserAuth = _interopRequireDefault(require("./db/UserAuth"));

var _UserDetails = _interopRequireDefault(require("./db/UserDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var walletObj = {
  "id": 146,
  "user_id": 2,
  "date": "26-05-2020",
  "description": "Paytm casgback",
  "type": "income",
  "amount": 360
};
var UserExpenses1 = new _UserExpenses["default"]();
UserExpenses1.createUserDetails(walletObj);
var UserAuth1 = new _UserAuth["default"]();
var userDetail = UserAuth1.findById("nelson@yahoo.com");
console.log("The user detal is:::::::::::::", userDetail);
var UserExpenses2 = new _UserExpenses["default"]();
var details = UserExpenses2.getExpenseDetailsByUser(walletObj.user_id);