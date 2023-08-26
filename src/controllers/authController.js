const UserService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

const loginUser = async (req, res) => {
    try {
        const token = await UserService.loginUser(req.body.email, req.body.password);
        successResponse(res, { token }, "Logged in successfully.");
    } catch (error) {
        logger.error(`Login User Error: ${error.message}`);
        errorResponse(res, error.message, 401);
    }
};

const registerUser = async (req, res) => {
    try {
        // Extract all the fields from the request body
        const { username, email, password, full_name } = req.body;

        // Call the UserService's registerUser function with all required fields
        const user = await UserService.registerUser(username, email, password, full_name);

        successResponse(res, { userId: user.id }, "User registered successfully.", 201);
    } catch (error) {
        logger.error(`Register User Error: ${error.message}`);
        errorResponse(res, error.message, 400);
    }
};


const requestPasswordReset = async (req, res) => {
    try {
        const resetToken = await UserService.requestPasswordReset(req.body.email);
        successResponse(res, { resetToken }, "Password reset link has been sent to your email.", 200);
    } catch (error) {
        logger.error(`Request Password Reset Error: ${error.message}`);
        errorResponse(res, error.message, 404);
    }
};

module.exports = {
    loginUser,
    registerUser,
    requestPasswordReset
};
