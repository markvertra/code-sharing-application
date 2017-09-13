const express = require('express');
const router = express.Router();
const User               = require('../../models/user');
const Project            = require('../../models/project');

//TODO:- Add getting projectObject by ID

router.get('/:profileId', (req, res, next) => {
  let profileId = req.params.profileId;
  User.findById(profileId, (err, user) => {
    if (err) { return next(err);}
    console.log(user);
    res.render('profile/profile', {user});
  });
});

module.exports = router;
