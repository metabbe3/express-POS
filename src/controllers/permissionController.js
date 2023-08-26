const PermissionService = require('../services/PermissionService');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

module.exports = {

    async getAllPermissions(req, res) {
        try {
            const permissions = await PermissionService.getAllPermissions();
            successResponse(res, permissions);
        } catch (error) {
            logger.error(`Failed to fetch permissions. Error: ${error.message}`);
            errorResponse(res, 'Failed to fetch permissions', 500);
        }
    },

    async createPermission(req, res) {
        try {
            const permission = await PermissionService.createPermission(req.body);
            successResponse(res, permission, 'Permission created successfully', 201);
        } catch (error) {
            logger.error(`Failed to create permission. Error: ${error.message}`);
            errorResponse(res, 'Failed to create permission', 400);
        }
    },

    async updatePermission(req, res) {
        try {
            const permissionId = req.params.id;
            const updates = req.body;
            const updatedPermission = await PermissionService.updatePermission(permissionId, updates);
            if (updatedPermission) {
                successResponse(res, updatedPermission);
            } else {
                successResponse(res, {}, 'Permission not found', 404);
            }
        } catch (error) {
            logger.error(`Failed to update permission. Error: ${error.message}`);
            errorResponse(res, 'Failed to update permission', 400);
        }
    },

    async deletePermission(req, res) {
        try {
            const permissionId = req.params.id;
            const deleted = await PermissionService.deletePermission(permissionId);
            if (deleted) {
                successResponse(res, {}, 'Permission deleted successfully');
            } else {
                successResponse(res, {}, 'Permission not found', 404);
            }
        } catch (error) {
            logger.error(`Failed to delete permission. Error: ${error.message}`);
            errorResponse(res, 'Failed to delete permission', 400);
        }
    },

    async assignPermissionToRole(req, res) {
        try {
            const { roleId, permissionId } = req.body;
            await PermissionService.assignPermissionToRole(roleId, permissionId);
            successResponse(res, {}, 'Permission assigned to role successfully');
        } catch (error) {
            logger.error(`Failed to assign permission to role. Error: ${error.message}`);
            errorResponse(res, 'Failed to assign permission to role');
        }
    }
};
