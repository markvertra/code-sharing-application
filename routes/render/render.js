const express = require('express');
const router = express.Router();
const Project = require('../../models/project');

router.get('/:projectID', (req, res, next) => {
  Project.findById((req.params.projectID), (err, project) => {
    if (err) {next(err);}
    res.render('render/render', { project, layout: false });
  });
});

module.exports = router;
