const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' })

router.get('/new', (req, res, next) => {
  res.render('project/new');
});

router.post('/new', upload.any(), (req, res, next) => {
 //TODO:- Look if is login

  console.log(req.files);

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
