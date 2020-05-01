"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var user_auth = require("../inmemory_db/user_auth.json");

var user_details = require("../inmemory_db/user_details.json");

var user_expenses = require("../inmemory_db/user_expenses.json");

var uuid = require("uuid").v1;

var Crud = /*#__PURE__*/function () {
  function Crud(tablename) {
    _classCallCheck(this, Crud);

    this.tablename = tablename;
    this.user_auth = user_auth;
    this.user_details = user_details;
    this.user_expenses = user_expenses;
  }

  _createClass(Crud, [{
    key: "findAll",
    value: function findAll(id) {
      if (this.tablename === "user_expenses") {
        var result = this.user_expenses.filter(function (expense) {
          return expense.user_id === id;
        });
        return result;
      }

      return [];
    }
  }, {
    key: "find",
    value: function find(id) {
      var result;

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
  }, {
    key: "create",
    value: function create(record) {
      record.id = uuid();

      if (this.tablename === "user_expenses") {
        this.user_expenses.push(record);
        console.log(this.user_expenses);
      } else if (this.tablename === "user_details") {
        this.user_details.push(record);
      } else {
        this.user_auth.push(record);
      }

      return record;
    }
  }, {
    key: "update",
    value: function update(record) {
      var index;

      if (this.tablename === "user_expenses") {
        index = this.findRecordIndex(this.user_expenses, record, this.tablename);
        this.user_expenses[index] = record;
      } else {
        index = this.findRecordIndex(this.user_details, record, this.tablename);
        this.user_details[index] = record;
      }

      return record;
    }
  }, {
    key: "findRecordIndex",
    value: function findRecordIndex(list, record, type) {
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
  }, {
    key: "delete",
    value: function _delete(record) {
      if (this.tablename === "user_expenses") {
        var index = this.findRecordIndex(this.user_expenses, record, this.tablename);
        this.user_expenses.splice(index, 1);
      } else {
        var _index = this.findRecordIndex(this.user_details, record, this.tablename);

        this.user_details.splice(_index, 1);
      }

      return "ok";
    }
  }]);

  return Crud;
}();

exports.default = Crud;