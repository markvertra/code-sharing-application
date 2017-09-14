const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');

router.get('/new', (req, res, next) => {
  res.render('project/new');
});

router.post('/new', (req, res, next) => {
 //TODO:- Look if is login

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
        $push: {projectIDs: req.user._id} }, (err, user) => {
        if (err) {return next(err);}
        console.log(user);
        res.redirect(req.headers.referer);
      });
  });
});

router.get('/:projectID', (req, res, next) => {
  let projectID = req.params.projectID;
  Project.findById(projectID).populate('userID', 'username _id').exec((err, project) => {
    if (err) {
      console.log("OK");
      next(err);}
    res.render('project/project', {project});
  });
});

module.exports = router;
