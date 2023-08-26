const RoleModel = require('../models/RoleModel');

const RoleService = {

    async getAllRoles() {
        return await RoleModel.getAllRoles();
    },

    async createRole(roleData) {
        return await RoleModel.createRole(roleData);
    },

    async updateRole(roleId, updates) {
        return await RoleModel.updateRole(roleId, updates);
    },

    async deleteRole(roleId) {
        return await RoleModel.deleteRole(roleId);
    }
};

module.exports = RoleService;
