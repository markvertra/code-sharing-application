const express = require('express');
const router = express.Router();
const Project = require('../../models/project');

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