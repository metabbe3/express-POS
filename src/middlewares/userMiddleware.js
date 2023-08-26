// middlewares/userMiddleware.js

const { errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

const validateUser = (req, res, next) => {
    if (!req.body.name || req.body.name.length < 3) {
        logger.warn('Invalid user data submitted', { service: 'User Validation' });
        return errorResponse(res, 'User name is required and should be at least 3 characters long.', 400);
    }
    next();
};

module.exports = {
    validateUser
};
