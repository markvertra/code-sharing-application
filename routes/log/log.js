const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require("bcrypt");
const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get('/login', (req, res, next) => {
  res.render('login', {"message": req.flash("error"), layout: 'layouts/layout'});
});

router.post('/login', passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {"message": req.flash("error"), layout: 'layouts/layout'});
});

router.post('/signup', (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    email: req.body.email
  });

  if (req.body.username === "" || req.body.password === "") {
    res.render('signup', {
        message: "All fields required to sign-up"
    });
    return;
  }

  User.findOne({ "username": newUser.username }, "username", (err, user) => {
    if (user !== null) {
      res.render('signup', {
        message: "That username already exists"
      });
      return;
    }
    newUser.save((err) => {
       if (err) {
         next(err);
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
});

module.exports = router;
