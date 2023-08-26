const RoleService = require('../services/RoleService');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

module.exports = {

    async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            successResponse(res, roles);
        } catch (error) {
            logger.error(`Failed to fetch roles. Error: ${error.message}`);
            errorResponse(res, 'Failed to fetch roles', 500);
        }
    },

    async createRole(req, res) {
        try {
            const role = await RoleService.createRole(req.body);
            successResponse(res, role, 'Role created successfully', 201);
        } catch (error) {
            logger.error(`Failed to create role. Error: ${error.message}`);
            errorResponse(res, 'Failed to create role', 400);
        }
    },

    async updateRole(req, res) {
        try {
            const roleId = req.params.id;
            const updates = req.body;
            const updatedRole = await RoleService.updateRole(roleId, updates);

            if (!updatedRole) {
                return successResponse(res, {}, 'Role not found', 404);
            }

            successResponse(res, updatedRole);
        } catch (error) {
            logger.error(`Failed to update role. Error: ${error.message}`);
            errorResponse(res, 'Failed to update role', 400);
        }
    },

    async deleteRole(req, res) {
        try {
            const roleId = req.params.id;
            const deleted = await RoleService.deleteRole(roleId);

            if (!deleted) {
                return successResponse(res, {}, 'Role not found', 404);
            }

            successResponse(res, {}, 'Role deleted successfully');
        } catch (error) {
            logger.error(`Failed to delete role. Error: ${error.message}`);
            errorResponse(res, 'Failed to delete role', 400);
        }
    }
};
