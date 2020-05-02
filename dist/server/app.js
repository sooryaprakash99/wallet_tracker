"use strict";

var _logger = _interopRequireDefault(require("./utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');

var express = require('express');

var path = require('path');

var session = require('express-session');

var loginRouter = require('./routes/login');

var expensesRouter = require('./routes/expenses');

var app = express();
app.set('port', 3000);
app.use(session({
  secret: 'XYk2!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 300000
  }
}));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
/**
 * 
 * @param {Saved user detail during login. Session expire configured as 5mins } req 
 * @param {*} res 
 * @param {*} next 
 */

var auth = function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

app.use(function (err, req, res, next) {
  if (err !== null) {
    _logger.default.error(err);
  }
});
app.get('/', function (req, res) {
  res.sendFile('public/default.html', {
    root: __dirname
  });
});
app.use("/login", loginRouter);
app.use('/expenses', auth, expensesRouter);
app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});
http.createServer(app).listen(app.get('port'), function () {
  _logger.default.info('Express server listening on port ' + app.get('port'));

  console.log('Express server listening on port ' + app.get('port'));
});