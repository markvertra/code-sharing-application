const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy;
const multer  = require('multer');
const admin = require('./routes/admin/admin');
const index = require('./routes/index');
const settings = require('./routes/settings/settings');
const profile = require('./routes/profile/profile');
const home = require('./routes/home/home');
const expressLayouts = require('express-ejs-layouts');


const app = express();

mongoose.connect("mongodb://localhost/code-sharing-application", {useMongoClient: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

const User = require("./models/user");

app.use(session({
  secret: 'code-sharing-application',
  resave: true,
  saveUninitialized: true
}));

// app.use(flash());

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy({
}, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Username does not exist" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Password is incorrect" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);
app.use('/profile', profile);
app.use('/home', home);
app.use('/settings', settings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (res.headerSent) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
