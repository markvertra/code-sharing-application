const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const bcrypt = require("bcrypt");

router.get('/view/:projectID', (req, res, next) => {
  res.render('project/project');
});

router.post('/save', (req, res, next) => {

});

router.post('/publish', (req, res, next) => {

  // const updateProject = new Project({
  //   projectName: req.body.projectName,
  //   userID: req.user._id,
  //   isPublic: true,
  //   file: {fileHTML: req.body.penHTML,
  //          fileCSS: req.body.penCSS,
  //          fileJS: req.body.penJS,
  //        }
  //   });
    
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
  console.log("HELLO" + req.user._id);
  const newProject = new Project({
    projectName: "",
    userID: req.user._id,
    isPublic: false,
    file: {fileHTML: "",
           fileCSS: "",
           fileJS: "",
         }
    });

    console.log("HELLO" + req.newProject._id);
  
    newProject.save((err) => {
      if (err) {return next(err);}

    res.redirect("/view" + newProject._id);

  // let projectID = req.params.projectID;
  // Project.findById(projectID).populate('userID', 'username _id').exec((err, project) => {
  //   if (err) {
  //     next(err);}
  //   res.render('project/project', {project});

  });
});


module.exports = router;
