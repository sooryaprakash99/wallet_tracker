"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserExpenses = _interopRequireDefault(require("../db/UserExpenses"));

var _UserDetails = _interopRequireDefault(require("../db/UserDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ExpenseCtrl = /*#__PURE__*/function () {
  function ExpenseCtrl() {
    _classCallCheck(this, ExpenseCtrl);
  }

  _createClass(ExpenseCtrl, [{
    key: "createExpense",
    value: function createExpense(expenseObj) {
      var user = new _UserDetails.default().find(expenseObj.user_id);

      if (!user) {
        return {
          code: 404,
          message: "User not found"
        };
      } else {
        var expenseResult = new _UserExpenses.default().create(expenseObj);
        return expenseResult;
      }
    }
  }, {
    key: "updateExpense",
    value: function updateExpense(expenseId, expenseObj) {
      var user = new _UserDetails.default().find(expenseObj.user_id);

      if (!user) {
        return {
          code: 404,
          message: "User not found"
        };
      } else {
        var userExpenses = new _UserExpenses.default();
        var existngExpense = userExpenses.find(expenseId);

        if (!existngExpense || existngExpense.user_id !== expenseObj.user_id) {
          return {
            code: 404,
            message: "Expense detail not found"
          };
        } else {
          var result = userExpenses.update(expenseObj);
          return result;
        }
      }
    }
  }, {
    key: "getAllExpenses",
    value: function getAllExpenses(userId) {
      var expenseResult = new _UserExpenses.default().findAll(userId);
      return expenseResult;
    }
  }, {
    key: "deleteExpense",
    value: function deleteExpense(id, userId) {
      var existngExpense = new _UserExpenses.default().find(id);

      if (!existngExpense || existngExpense.user_id !== userId) {
        return {
          code: 404,
          message: "Expense detail not found"
        };
      } else {
        var result = new _UserExpenses.default().delete({
          id: id
        });
        return result;
      }
    }
  }]);

  return ExpenseCtrl;
}();

exports.default = ExpenseCtrl;