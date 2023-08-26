const RolePermissionService = require('../services/RolePermissionService');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

module.exports = {

    async assignPermissionToRole(req, res) {
        try {
            const { roleId, permissionId } = req.body;
            await RolePermissionService.assignPermissionToRole(roleId, permissionId);
            successResponse(res, {}, 'Permission assigned successfully to role');
        } catch (error) {
            logger.error(`Failed to assign permission to role. Error: ${error.message}`);
            errorResponse(res, 'Failed to assign permission to role');
        }
    },

    async revokePermissionFromRole(req, res) {
        try {
            const { roleId, permissionId } = req.body;
            await RolePermissionService.revokePermissionFromRole(roleId, permissionId);
            successResponse(res, {}, 'Permission revoked successfully from role');
        } catch (error) {
            logger.error(`Failed to revoke permission from role. Error: ${error.message}`);
            errorResponse(res, 'Failed to revoke permission from role');
        }
    },

    async getRolePermissions(req, res) {
        try {
            const roleId = req.params.id;
            const permissions = await RolePermissionService.getRolePermissions(roleId);
            successResponse(res, permissions);
        } catch (error) {
            logger.error(`Failed to fetch permissions for role. Error: ${error.message}`);
            errorResponse(res, 'Failed to fetch permissions for role');
        }
    }
};
