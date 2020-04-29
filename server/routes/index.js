
import express from "express";
import LoginCtrl from "../controller/LoginCtrl";

let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  req.session.userId = "c5ea4c0-4067-11e9-8b2d-1b9d6bcdbbfd";
  req.session.save((err) => {
    res.sendFile("../../public/index.html", { isLoggedIn: false });
  });
});

router.post("/login", function (req, res) {

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

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
