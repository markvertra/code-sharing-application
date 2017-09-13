const express = require('express');
const router = express.Router();
const User               = require('../../models/user')
const Project            = require('../../models/project')
const bcrypt = require("bcrypt");

router.get('/', (req, res, next) => {
    User.find({}, (err, users ) => {
        if (err) { next(err)}
    Project.find({}, (err, projects ) => {
        if (err) { next(err)}
    res.render('admin/admin', {users: users, projects: projects})
    });
    });
});

router.post('/createuser', (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        email: req.body.email,
        role: "User"
    })
      
    newUser.save((err) => {
        if (err) {return next(err)}
        res.redirect('/admin');
    })
});

router.post('/edituser/:userID', (req, res, next) => {
    
    res.redirect('admin/admin');
    })

router.post('/deleteuser/:userID', (req, res, next) => {

    res.redirect('admin/admin');
})

module.exports = router;