const express = require('express');
const router = express.Router();
const passport = require("passport");
const User               = require('../models/user')
const bcrypt = require("bcrypt");


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

router.post('/login', passport.authenticate("local-login", {
    successRedirect: "http://www.yahoo.com",
    failureRedirect: "http://www.google.com",
}));

router.post('/signup', (req, res, next) => {
  
        const newUser = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        });
    
        if (req.body.username === "" || req.body.password === "") {
            // res.render("/signup", {
            //   errorMessage: "All fields required to sign-up"
            // });
            return;
        }
    
        User.findOne({ "username": newUser.username }, "username", (err, user) => {
            if (user !== null) {
              // res.render("passport/signup", {
              //   errorMessage: "That username already exists"
              // });
              return;
            }
        })
    
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
                res.redirect('http://www.bbc.co.uk');
              })  
            }
        });
    });  


module.exports = router;
