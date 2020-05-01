"use strict";

var _express = _interopRequireDefault(require("express"));

var _LoginCtrl = _interopRequireDefault(require("../controller/LoginCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post("/", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var loginCtrl = new _LoginCtrl.default();
  var result = loginCtrl.loginUser(username, password);

  if (result.code) {
    res.status(result.code).send(result.message);
  } else {
    req.session.user = result;
    req.session.save(function (err) {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send({
          "message": err
        });
      }
    });
  }
});
module.exports = router;