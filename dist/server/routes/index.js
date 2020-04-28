"use strict";

var _express = _interopRequireDefault(require("express"));

var _LoginCtrl = _interopRequireDefault(require("../controller/LoginCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res, next) {
  // if (!req.session.userId) {
  //   //Render the login page
  //   res.status(200).send({ message: "working fine" });
  // } else {
  //   res.status(200).send({ "message": "session available" })
  // }
  console.log(req.session, req.sessionID);

  if (!req.session.userId) {
    console.log(req.session, req.sessionID);
    req.session.userId = "soorya";
    req.session.save(function (err) {
      res.render('index', {
        'title': "Wallet Tacker"
      });
    });
  } else {
    res.render('index', {
      'title': "Wallet Tacker"
    });
  }
});
router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var loginCtrl = new _LoginCtrl["default"]();
  var result = loginCtrl.loginUser(username, password);

  if (result.code) {
    res.status(result.code).send(result.message);
  } else {
    req.session.userId = result.id;
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
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return console.log(err);
    }

    res.redirect('/');
  });
});
module.exports = router;