
import express from "express";
import LoginCtrl from "../controller/LoginCtrl";

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // if (!req.session.userId) {
  //   //Render the login page
  //   res.status(200).send({ message: "working fine" });
  // } else {
  //   res.status(200).send({ "message": "session available" })
  // }

  console.log(req.session, req.sessionID)
  if (!req.session.userId) {
    console.log(req.session, req.sessionID)
    req.session.userId = "soorya";
    req.session.save(function(err) {
      res.render('index', {'title' : "Wallet Tacker"});
    })
    
  } else {
    res.render('index', {'title' : "Wallet Tacker"});
  }
   
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
