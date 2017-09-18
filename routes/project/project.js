const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const bcrypt = require("bcrypt");



router.post('/save/:projectID', (req, res, next) => {
  console.log(req.params.projectID)
});

router.post('/publish/:projectID', (req, res, next) => {
  console.log(req.params.projectID)

  const updateProject = {
    projectName: req.body.projectName,
    isPublic: true,
    file: {fileHTML: req.body.penHTML,
          fileCSS: req.body.penCSS,
           fileJS: req.body.penJS,
          }
   };
    
  // updateProject.save((err) => {
  //   if (err) {return next(err);}

  //   // NO LONGER NEEDED AS GENERATED ON SIGN-IN

  //   // User.findByIdAndUpdate(req.user._id,{
  //   //   $push: {projectIDs: newProject._id} }, (err, user) => {
  //   //   if (err) {return next(err);}

  //     res.redirect('home');
  // });
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
