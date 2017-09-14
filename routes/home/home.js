const express = require('express');
const router = express.Router();
const Project = require('../../models/project');

router.get('/', (req, res, next) => {
  Project.find({}).populate('userID', 'username _id').exec((err, projects) => {
    if (err) {next(err);}
    res.render('home/home', {projects, "message": req.flash("error")});
  });
});

module.exports = router;
