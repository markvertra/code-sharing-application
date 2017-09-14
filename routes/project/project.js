const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Project = require('../../models/project');

router.get('/:projectID', (req, res, next) => {
  console.log(req);
  res.render('project/project');
});

module.exports = router;
