const router = require('express').Router();

const { isAuthenticated } = require('../../libs/jwt');
const ctrl = require('./auth.ctrl');

// Signup
router.post('/signup', ctrl.signup);

// Signin
router.post('/signin', ctrl.signin);

// Me
router.get('/me', isAuthenticated(), ctrl.me);

module.exports = router;
