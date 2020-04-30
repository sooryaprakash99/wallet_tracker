let user_auth = require("../inmemory_db/user_auth.json");
let user_details = require("../inmemory_db/user_details.json");
let user_expenses = require("../inmemory_db/user_expenses.json");
let uuid = require("uuid").v1;

export default class Crud {

    constructor(tablename) {
        this.tablename = tablename;
        this.user_auth = user_auth;
        this.user_details = user_details;
        this.user_expenses = user_expenses;
    }

    findAll(id) {
        if (this.tablename === "user_expenses") {
            let result = this.user_expenses.filter(function (expense) {
                return expense.user_id === id;
            });
            return result;
        }
        return [];
    }

    find(id) {
        let result;
        if (this.tablename === 'user_details') {
            result = this.user_details.find(function (user) {
                return user.id === id || user.email === id;
            });
        } else if (this.tablename === 'user_auth') {
            result = this.user_auth.find(function (user) {
                return user.username === id;
            });
        } else {
            result = this.user_expenses.find(function (userExpense) {
                return userExpense.id === id;
            });
        }
        return result;
    }

    create(record) {
        record.id = uuid();
        if (this.tablename === "user_expenses") {
            this.user_expenses.push(record);
            console.log(this.user_expenses);
        } else if (this.tablename === "user_details") {
            this.user_details.push(record);
        } else {
            this.user_auth.push(record)
        }
        return record;
    }

    update(record) {
        let index;
        if (this.tablename === "user_expenses") {
            index = this.findRecordIndex(this.user_expenses, record, this.tablename);
            this.user_expenses[index] = record;
        } else {
            index = this.findRecordIndex(this.user_details, record, this.tablename);
            this.user_details[index] = record;
        }
        return record;
    }

    findRecordIndex(list, record, type) {
        var index;
        if (type === "user_details") {
            index = list.findIndex(function (item) {
                return item.email === record.email;
            });
        } else {
            index = list.findIndex(function (item) {
                return item.id === record.id;
            });
        }
        return index;
    }

}
