var createError = require('http-errors');
var express = require('express');
var path = require('path');

import logger from './utils/logger';
var session = require('express-session');

var loginRouter = require('./routes/login');
var expensesRouter = require('./routes/expenses');

var app = express();

app.use(session({
  secret: 'XYk2!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 300000 }
}));


app.use(express.urlencoded({ extended: false }));
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
var auth = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

app.use("/login", loginRouter);
app.use('/expenses', auth, expensesRouter);

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.sendFile('public/default.html', { root: __dirname })
});

app.listen(3000, () => { logger.error('App listening on port 4000') })

