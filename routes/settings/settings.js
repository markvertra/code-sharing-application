const express = require('express');
const router = express.Router();
const User               = require('../../models/user')
const Project            = require('../../models/project')
const bcrypt = require("bcrypt");

// TODO Using known user ID until authorisation ready and can check current user

router.get('/', (req, res, next) => {
   
   const USER_ID = "59b954dc23b101659d3c5ac5"; 

    User.findById(USER_ID, (err, user) => {
        if (err) { return next(err) }  
        
        res.render('settings/settings', {user: user});
  });
});

  // TODO - ADD PASSWORD VALIDATION, ADD EMAIL VALIDATION
router.post('/edituser/:userID', (req, res, next) => {


  const infoUser = {
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    email: req.body.email,
  };
  
  User.findByIdAndUpdate(req.params.userID, infoUser, (err, user) => {

    if (err) { return next(err) }
      res.redirect('/');
  });
});


// TODO sign out of session
router.post('/deleteuser/:userID', (req, res, next) => {

    User.findByIdAndRemove(req.params.userID, (err, users) => {
        if (err) { return next(err);}
        
            // SIGN OUT
            res.redirect('/');
      });
 
})

var allUsers = User.find({}, (err, users) => {
          if (err) { return next(err);}
          return users;
          });

module.exports = router;