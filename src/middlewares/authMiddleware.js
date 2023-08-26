const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const { errorResponse } = require('../utils/responseUtils');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    async authenticate(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const user = await UserModel.findById(decodedToken.id);
            
            if (!user) {
                throw new Error('User not found.');
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return errorResponse(res, "Token has expired.", 401);
            }
            if (error instanceof jwt.JsonWebTokenError) {
                return errorResponse(res, "Invalid token.", 401);
            }
            errorResponse(res, "Authentication failed.", 401);
        }
    },
};
