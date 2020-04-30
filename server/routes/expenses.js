
import express from "express";
import ExpenseCtrl from "../controller/ExpenseCtrl";
import LoginCtrl from "../controller/LoginCtrl";

var router = express.Router();
var expenseCtrl = new ExpenseCtrl();

router.post('/', function (req, res) {
  let result = expenseCtrl.createExpense(req.body);
  sendResponse(result, res);
});

router.put('/:expenseId', function (req, res) {
  let result = expenseCtrl.updateExpense(req.params.expenseId, req.body);
  sendResponse(result, res);
});

router.get('/', function (req, res) {
  let result = expenseCtrl.getAllExpenses(req.session.user.id);
  sendResponse(result, res);
});

function sendResponse(result, res) {
  if (result.code) {
    res.status(result.code).send({ message: result.message })
  } else {
    res.status(200).send(result)
  }
}



module.exports = router;
