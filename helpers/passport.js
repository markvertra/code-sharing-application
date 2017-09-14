const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User               = require('../models/user')



module.exports = (passport) => 

    passport.serializeUser((user, cb) => {
        cb(null, user._id);
    });
  
    passport.deserializeUser((id, cb) => {
        User.findOne({ "_id": id }, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
        });
    });
  
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
        }, (req, username, password, next) => {
        User.findOne({ username }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, { message: "That user is not registered" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "That isn't your password" });
        }
    
        return next(null, user);
        });
    }));
  

    { passport.use('local-signup', new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, next) => {
            process.nextTick(() => {
                User.findOne({
                    'username': username
                }, (err, user) => {
                    if (err){ return next(err); }

                    if (user) {
                        return next(null, false);
                    } else {
                        const { username, email, password } = req.body;
                        const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                        const newUser = new User({
                        username,
                        email,
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


};
