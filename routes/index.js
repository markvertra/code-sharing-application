const express = require('express');
const router = express.Router();
const passport = require("../helpers/passport");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

router.post('/login', passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "http://www.google.com",
}));

module.exports = router;
