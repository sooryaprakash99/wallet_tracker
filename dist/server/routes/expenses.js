"use strict";

var _express = _interopRequireDefault(require("express"));

var _ExpenseCtrl = _interopRequireDefault(require("../controller/ExpenseCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

var expenseCtrl = new _ExpenseCtrl.default();
router.get('/', function (req, res) {
  var result = expenseCtrl.getAllExpenses(req.session.user.id);
  sendResponse(result, res);
});
router.post('/', function (req, res) {
  req.body.user_id = req.session.user.id;
  var result = expenseCtrl.createExpense(req.body);
  sendResponse(result, res);
});
router.put('/:expenseId', function (req, res) {
  req.body.user_id = req.session.user.id;
  var result = expenseCtrl.updateExpense(req.params.expenseId, req.body);
  sendResponse(result, res);
});
router.delete('/:expenseId', function (req, res, next) {
  var result = expenseCtrl.deleteExpense(req.params.expenseId, req.session.user.id);
  sendResponse(result, res);
});

function sendResponse(result, res) {
  if (result.code) {
    res.status(result.code).send({
      message: result.message
    });
  } else {
    res.status(200).send(result);
  }
}

module.exports = router;