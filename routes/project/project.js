const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const bcrypt = require("bcrypt");

router.post('/save/:projectID', (req, res, next) => {
  const updateProject = {
    projectName: req.body.projectName,
    file: {fileHTML: req.body.writeHTML,
           fileCSS: req.body.writeCSS,
           fileJS: req.body.writeJS,
          }
   };

  Project.findByIdAndUpdate(req.params.projectID, updateProject, (err, project) => {

    if (err) { next(err); }
    res.redirect("/project/" + project._id);
  });
});

router.post('/publish/:projectID', (req, res, next) => {

  const updateProject = {
    projectName: req.body.hiddenProjectName,
    isPublic: true,
    file: {fileHTML: req.body.hiddenHTML,
            fileCSS: req.body.hiddenCSS,
             fileJS: req.body.hiddenJS,
      }
   };

  Project.findByIdAndUpdate(req.params.projectID, updateProject, (err, project) => {
      if (err) {return next(err); }
      res.redirect('/');
  });
});

router.post('/new', (req, res, next) => {

  const newProject = new Project({
    projectName: "My New Project",
    userID: req.user._id,
    isPublic: false,
    file: {fileHTML: "",
           fileCSS: "",
           fileJS: "",
         }
    });


    newProject.save((err) => {
      if (err) {return next(err);}

      User.findByIdAndUpdate(req.user._id,{
        $push: {projectIDs: newProject._id} }, (err, user) => {
        if (err) { next(err);}

        res.redirect("/project/" + newProject._id);
    });
  });
});


router.get('/:projectID', (req, res, next) => {
  var source = req.params.projectID;
  console.log(source);
  Project.findById((source), (err, project) => {
    if (err) {next(err);}
    if (typeof req.user === "undefined") {
      const user = { _id: 999, username: "anonymous" };
      res.render('project/project', {source, project: project, user: user, layout: 'layouts/project-layout' });
    } else {
      const user = req.user;
      res.render('project/project', {source, project: project, user: user, layout: 'layouts/project-layout' });
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
