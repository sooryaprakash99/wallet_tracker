import UserExpenses from "../db/UserExpenses";
import UserDetails from "../db/UserDetails";

export default class ExpenseCtrl {

    constructor() {
    }

    createExpense(expenseObj) {
        let user = new UserDetails().find(expenseObj.user_id);
        if (!user) {
            return {
                code: 404,
                message: "User not found"
            }
        } else {
            let expenseResult = new UserExpenses().create(expenseObj);
            return expenseResult;
        }
    }

    updateExpense(expenseId, expenseObj) {
        let user = new UserDetails().find(expenseObj.user_id);
        if (!user) {
            return {
                code: 404,
                message: "User not found"
            }
        } else {
            let userExpenses = new UserExpenses();
            let existngExpense = userExpenses.find(expenseId);
            if (!existngExpense || existngExpense.user_id !== expenseObj.user_id) {
                return {
                    code: 404,
                    message: "Expense detail not found"
                }
            } else {
                let result = userExpenses.update(expenseObj);
                return result;
            }
        }
    }

    getAllExpenses(userId) {
        let expenseResult = new UserExpenses().findAll(userId);
        return expenseResult;
    }

    deleteExpense(id, userId) {
        let existngExpense = new UserExpenses().find(id);
        if (!existngExpense || existngExpense.user_id !== userId) {
            return {
                code: 404,
                message: "Expense detail not found"
            }
        } else {
            let result = new UserExpenses().delete({ id: id });
            return result;
        }

    }

}
