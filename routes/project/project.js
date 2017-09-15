const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const multer = require('multer');
const bcrypt = require("bcrypt");
const upload = multer({ dest: './public/uploads/' });

router.get('/new', (req, res, next) => {
  res.render('project/new');
});

router.post('/new', upload.any(), (req, res, next) => {
 //TODO:- Look if is login

  const newProject = new Project({
    projectName: req.body.projectName,
    userID: req.user._id,
    file: {fileHTML: `/uploads/${req.user._id}/${req.body.projectName}/${req.files.filename}`,
           fileCSS: `/uploads/${req.user._id}/${req.body.projectName}/${req.files.filename}`,
           fileJS: `/uploads/${req.user._id}/${req.body.projectName}/${req.files.filename}`,
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

router.post("/signup",  upload.any(), (req, res, next) => {

  console.log("FILES: " + req.files);
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    email: req.body.email
  });
    if (req.body.username === "" || req.body.password === "" || req.body.email === "") {
      // res.render("login", {
      //     errorMessage: "All fields required to sign-up"
      // });
      return;
  }

  User.findOne({ "username": newUser.username }, "username", (err, user) => {
      if (user !== null) {
        // res.render("passport/signup", {
        //   errorMessage: "That username already exists"
        // });
        return;
      }
  });

  User.findOne({ "email": newUser.email }, "email", (err, user) => {
      if (user !== null) {
        // res.render("passport/signup", {
        //   errorMessage: "That username already exists"
        // });
        return;
      }
  });

  const newUserID = newUser._id;

  newUser.save((err) => {
      if (err) {
          next(err);
          // res.render("passport/signup", {
          //    errorMessage: "Something went wrong when signing up"
          // });
      } else {
        req.login(newUser, (err) => {
          if (err) {
            next(err);
          }

          const newProject = new Project({
            projectName: req.body.projectName,
            userID: newUserID,
            file: {fileHTML: `/uploads/${newUserID}/${req.body.projectName}/${req.files.filename}`,
                   fileCSS: `/uploads/${newUserID}/${req.body.projectName}/${req.files.filename}`,
                   fileJS: `/uploads/${newUserID}/${req.body.projectName}/${req.files.filename}`,
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
      }
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
