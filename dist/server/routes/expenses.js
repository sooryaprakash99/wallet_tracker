"use strict";

var _express = _interopRequireDefault(require("express"));

var _ExpenseCtrl = _interopRequireDefault(require("../controller/ExpenseCtrl"));

var _LoginCtrl = _interopRequireDefault(require("../controller/LoginCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var expenseCtrl = new _ExpenseCtrl["default"]();
router.post('/', function (req, res, next) {
  var result = expenseCtrl.createExpense(req.body);
  sendResponse(result, res);
});
router.put('/:expenseId', function (req, res, next) {
  var result = expenseCtrl.updateExpense(req.params.expenseId, req.body);
  sendResponse(result, res);
});
router["delete"]('/:expenseId', function (req, res, next) {
  var result = expenseCtrl.deleteExpense(req.params.expenseId, req.session.userId);
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