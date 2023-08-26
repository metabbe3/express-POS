const logger = require('../utils/logger');
const { errorResponse } = require('../utils/responseUtils');

function requireRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.roles && req.user.roles.includes(role)) {
            return next();
        } else {
            logger.warn(`Unauthorized access attempt by user ${req.user ? req.user.id : 'unknown'}. Required role: ${role}`);
            return errorResponse(res, "Access denied.", 403);
        }
    };
}

module.exports = { requireRole };
