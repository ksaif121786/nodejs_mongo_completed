const express = require('express');
const router = express();

// authentication
const authentication = require('../middlewares/authentication');
// controllers
const authcontroller = require('../controllers/authcontroller');
router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
router.post('/userprofile', authentication, authcontroller.userprofile);


module.exports = router;