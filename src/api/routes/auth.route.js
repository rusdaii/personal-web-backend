const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/login', AuthController.loginUser);

module.exports = router;
