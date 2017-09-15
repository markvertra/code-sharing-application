const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
    if (req.user) {
      res.json({ user: true});
    } else
      res.json({ user: false});
});

module.exports = router;
