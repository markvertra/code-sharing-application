const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require('../models/user');
const bcrypt = require("bcrypt");


/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/home');
});

router.post('/login', passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
}));

router.post('/signup', (req, res, next) => {

        const newUser = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            email: req.body.email
        });

        if (req.body.username === "" || req.body.password === "" || req.body.email === "") {
            res.render("login", {
                errorMessage: "All fields required to sign-up"
            });
            return;
        }

        User.findOne({ "username": newUser.username }, "username", (err, user) => {
            if (user !== null) {
              // res.render("passport/signup", {
              //   errorMessage: "That username already exists"
              // });
              return;
            }
        });

        User.findOne({ "email": newUser.email }, "email", (err, user) => {
            if (user !== null) {
              // res.render("passport/signup", {
              //   errorMessage: "That username already exists"
              // });
              return;
            }
        });

       newUser.save((err) => {
            if (err) {
                next(err);
                // res.render("passport/signup", {
                //    errorMessage: "Something went wrong when signing up"
                // });
            } else {
              req.login(newUser, (err) => {
                if (err) {
                  next(err);
                }
                res.redirect('home');
              });
            }
        });
    });


module.exports = router;
