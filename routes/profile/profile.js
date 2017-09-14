const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Project = require('../../models/project');

router.get('/:profileId', (req, res, next) => {
  console.log(req);
  let profileId = req.params.profileId;
  User.findById(profileId).populate('projectIDs').exec((err, user) => {
    if (err) {
      next(err);}
    res.render('profile/profile', {user});
  });
});

module.exports = router;
