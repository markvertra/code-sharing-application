const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');

//Session
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require('req-flash');
const connectLogin = require("connect-ensure-login");

//helpers
const helperPassport = require('./helpers/passport');

//Routes
const admin = require('./routes/admin/admin');
const index = require('./routes/index');
const settings = require('./routes/settings/settings');
const profile = require('./routes/profile/profile');
const home = require('./routes/home/home');
const project = require('./routes/project/project');
const api = require('./routes/api/api');
const logRoute = require('./routes/log/log');

const app = express();

//Database
mongoose.connect("mongodb://localhost/code-sharing-application", {useMongoClient: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.use(session({
  secret: 'code-sharing-application',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

//setup session
app.use(flash());
helperPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

//setup utils
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (typeof(req.user) !== "undefined"){
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});

app.locals.thumbnailRenderer = function (projectId, htmlFile, cssFile, jsFile) {
  console.log(projectId + htmlFile + cssFile + jsFile);

  const frame = $("'#" + projectId + "'");
  const contents = frame.contents();
  const body = contents.find('body');
  const styling = contents
                  .find('head')
                  .append('<style></style>')
                  .children('style');

  const bodyText = htmlFile + "<script>" + jsFile + "</script>"
  body.html(bodyText);
  styling.html(cssFile);
};


//setup routes
app.use('/', index);
app.use('/api', api);
app.use('/admin', admin);
app.use('/profile', profile);
app.use('/home', home);
app.use('/settings', settings);
app.use('/project', project);
app.use('/', logRoute);

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

  if (res.headerSent) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
