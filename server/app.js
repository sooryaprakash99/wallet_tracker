var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');

import logger from './utils/logger';
var session = require('express-session');

var loginRouter = require('./routes/login');
var expensesRouter = require('./routes/expenses');

var app = express();

app.use(session({
  secret: 'XYk2!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static(path.join(__dirname, 'public')));

app.use("*", (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
})

app.use("/login", loginRouter)
app.use('/expenses', expensesRouter);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
})

app.get('/', (req, res) => {
  res.sendFile('public/default.html', { root: __dirname })
});

app.listen(3000, ()=>{logger.error('App listening on port 4000')})

