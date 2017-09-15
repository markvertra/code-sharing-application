const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');

router.get('/new', (req, res, next) => {
  res.render('project/new');
});

//TODO:- Look if is login
router.post('/new', (req, res, next) => {
  const newProject = new Project({
    projectName: req.body.projectName,
    userID: req.user._id,
    file: {fileHTML: req.body.fileHTML,
           fileCSS: req.body.fileCSS,
           fileJS: req.body.fileJS,
         }
    });

  newProject.save((err) => {
    if (err) {return next(err);}

    User.findByIdAndUpdate(req.user._id,{
        $push: {projectIDs: newProject._id} }, (err, user) => {
        if (err) {return next(err);}
        res.redirect(req.headers.referer);
    });
  });
});

router.get('/:projectID', (req, res, next) => {
  let projectID = req.params.projectID;
  Project.findById(projectID).populate('userID', 'username _id').exec((err, project) => {
    if (err) {next(err);}

    res.render('project/project', {project});
  });
});

module.exports = router;
