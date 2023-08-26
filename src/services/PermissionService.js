const permissionModel = require('../models/PermissionModel');

const PermissionService = {
    async getAllPermissions() {
        return await permissionModel.getAllPermissions();
    },

    async createPermission(permissionData) {
        // Add input validation here if needed
        return await permissionModel.createPermission(permissionData);
    },

    async updatePermission(permissionId, updates) {
        // Add input validation here if needed
        return await permissionModel.updatePermission(permissionId, updates);
    },

    async deletePermission(permissionId) {
        return await permissionModel.deletePermission(permissionId);
    },

    async assignPermissionToRole(roleId, permissionId) {
        return await permissionModel.assignToRole(roleId, permissionId);
    }
};

module.exports = PermissionService;
