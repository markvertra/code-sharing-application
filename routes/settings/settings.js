const express = require('express');
const router = express.Router();
const User               = require('../../models/user')
const Project            = require('../../models/project')
const bcrypt = require("bcrypt");

router.get('/', (req, res, next) => {
   // Using known user ID until authorisation ready
   const USER_ID = "59b954dc23b101659d3c5ac5"; 

    User.findById(USER_ID, (err, user) => {
        if (err) { return next(err) }  
        res.render('settings/settings', {user: user});
  });
});


router.post('/edituser/:userID', (req, res, next) => {
    
  const infoUser = {
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    email: req.body.email,
  };
  
  User.findByIdAndUpdate(req.params.userID, infoUser, (err, users) => {

    if (err) { return next(err) }
    User.find({}, (err, users) => {
      if (err) { return next(err) }
      
      res.redirect('/');
  });
  });
});


module.exports = router;