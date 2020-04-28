'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _UserAuth = _interopRequireDefault(require("../db/UserAuth"));

var _UserDetails = _interopRequireDefault(require("../db/UserDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginCtrl = /*#__PURE__*/function () {
  function LoginCtrl() {
    _classCallCheck(this, LoginCtrl);
  }

  _createClass(LoginCtrl, [{
    key: "loginUser",
    value: function loginUser(username, password) {
      var userAuth = new _UserAuth["default"]();
      var userDetails = new _UserDetails["default"]();
      var userObj = userAuth.find(username);

      if (userObj) {
        if (userObj.password === password) {
          var user = userDetails.find(userObj.username);
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
        };
      }
    }
  }]);

  return LoginCtrl;
}();

exports["default"] = LoginCtrl;