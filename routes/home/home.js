const express = require('express');
const router = express.Router();
const Project = require('../../models/project');

//TODO:- Create user from ID

router.get('/', (req, res, next) => {
    Project.find({}, (err, projects) => {
    if (err) { return next(err);}
    res.render('home/home', {projects: projects, "message": req.flash("error")});
    });
});

module.exports = router;
