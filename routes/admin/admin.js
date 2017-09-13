const express = require('express');
const router = express.Router();
const User               = require('../../models/user')
const Project            = require('../../models/project')

router.get('/', (req, res, next) => {
    User.find({}, (err, users ) => {
        if (err) { next(err)}
    Project.find({}, (err, projects ) => {
        if (err) { next(err)}
    res.render('admin/admin', {users: users, projects: projects})
    });
    });
});

module.exports = router;