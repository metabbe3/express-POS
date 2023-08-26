const RolePermissionModel = require('../models/RolePermissionModel');

const RolePermissionService = {

    async assignPermissionToRole(roleId, permissionId) {
        return await RolePermissionModel.assignPermission(roleId, permissionId);
    },

    async revokePermissionFromRole(roleId, permissionId) {
        return await RolePermissionModel.revokePermission(roleId, permissionId);
    },

    async getRolePermissions(roleId) {
        return await RolePermissionModel.getRolePermissions(roleId);
    }
};

module.exports = RolePermissionService;
