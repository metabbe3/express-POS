const express = require('express');
const AuthController = require('../controllers/authController');
const asyncMiddleware = require('../utils/asyncMiddleware');

const router = express.Router();

router.post('/login', asyncMiddleware(AuthController.loginUser));
router.post('/register', asyncMiddleware(AuthController.registerUser));
router.post('/request-password-reset', asyncMiddleware(AuthController.requestPasswordReset));
router.post('/get-token', asyncMiddleware(AuthController.generateTokenForUser));

// TODO: Implement route to handle password reset when user clicks on the reset link received via email

module.exports = router;
