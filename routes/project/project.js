const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const bcrypt = require("bcrypt");



router.post('/save/:projectID', (req, res, next) => {
  
  const updateProject = {
    projectName: req.body.projectName,
    file: {fileHTML: req.body.penHTML,
          fileCSS: req.body.penCSS,
           fileJS: req.body.penJS,
          }
   };

  Project.findByIdAndUpdate(req.params.projectID, updateProject, (err, project) => {
     
    if (err) { next(err); }
  
    res.redirect("/");
  });
});

router.post('/publish/:projectID', (req, res, next) => {

  const updateProject = {
    isPublic: true,
   };

  Project.findByIdAndUpdate(req.params.projectID, updateProject, (err, project) => {
      if (err) {return next(err); }
      res.redirect('/');
  });
});

router.post('/new', (req, res, next) => {

  const newProject = new Project({
    projectName: "My Random Project",
    userID: req.user._id,
    isPublic: false,
    file: {fileHTML: "",
           fileCSS: "",
           fileJS: "",
         }
    });

  
    newProject.save((err) => {
      if (err) {return next(err);}

      res.redirect("/project/" + newProject._id);

  });
});

router.get('/:projectID', (req, res, next) => {

  Project.findById((req.params.projectID), (err, project) => {
    console.log("PROJECT" + project._id);
    if (err) {next(err);}
    res.render('project/project', { project: project });
  });
});

module.exports = router;
