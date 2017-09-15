const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/:profileId', (req, res, next) => {
  let profileId = req.params.profileId;
  User.findById(profileId).populate('projectIDs', 'projectName').exec((err, user) => {
    if (err) {next(err);}
    res.render('profile/profile', {user});
  });
});

module.exports = router;
