const UserService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await UserService.updateUser(userId, req.body);
        successResponse(res, updatedUser, "User updated successfully");
    } catch (error) {
        logger.error(`Update User Error: ${error.message}`);
        errorResponse(res, "Failed to update user", 500);
    }
};

const deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        successResponse(res, {}, "User deleted successfully");
    } catch (error) {
        logger.error(`Delete User Error: ${error.message}`);
        errorResponse(res, "Failed to delete user", 500);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user.id);
        successResponse(res, user, "User retrieved successfully");
    } catch (error) {
        logger.error(`Get User Error: ${error.message}`);
        errorResponse(res, "Failed to retrieve user", 500);
    }
};

const getUserRolesAndPermissions = async (req, res) => {
    try {
        const userId = req.user.id;  // Extracted from JWT
        const { roles, permissions } = await UserService.getUserRolesAndPermissions(userId);
        
        successResponse(res, { roles, permissions }, "Roles and permissions fetched successfully.");
    } catch (error) {
        logger.error(`Get User Roles and Permissions Error: ${error.message}`);
        errorResponse(res, "Failed to fetch roles and permissions", 500);
    }
};


module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    getUserRolesAndPermissions
};
