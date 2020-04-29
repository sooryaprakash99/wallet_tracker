
import express from "express";
import LoginCtrl from "../controller/LoginCtrl";

let router = express.Router();

router.post("/", function (req, res) {

  let username = req.body.username;
  let password = req.body.password;

  var loginCtrl = new LoginCtrl();
  let result = loginCtrl.loginUser(username, password);

  if (result.code) {
    res.status(result.code).send(result.message);
  } else {
    req.session.userId = result.id;
    req.session.save((err) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ "message": err });
      }
    });
  }
});

module.exports = router;
