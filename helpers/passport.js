const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(session({
    secret: "passport-local-strategy",
    resave: true,
    saveUninitialized: true
  }));

passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  
passport.deserializeUser((id, cb) => {
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  
passport.use('local-login', new LocalStrategy((username, password, next) => {
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

passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
          User.findOne({
              'username': username
          }, (err, user) => {
              if (err){ return next(err); }
  
              if (user) {
                  return next(null, false);
              } else {
                  // Destructure the body
                  const { username, email, description, password } = req.body;
                  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                  const newUser = new User({
                    username,
                    email,
                    description,
                    password: hashPass
                  });
  
                  newUser.save((err) => {
                      if (err){ next(err); }
                      return next(null, newUser);
                  });
              }
          });
      });
}));

passport.use('local-signup', new LocalStrategy((username, password, next) => {
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