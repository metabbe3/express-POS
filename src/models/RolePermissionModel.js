const knex = require('../utils/connection');
const logger = require('../utils/logger');

module.exports = {
    async assignPermission(roleId, permissionId) {
        try {
            await knex('role_permissions').insert({ role_id: roleId, permission_id: permissionId });
        } catch (error) {
            logger.error(`Error assigning permission with ID ${permissionId} to role with ID ${roleId}: ${error.message}`);
            throw error;
        }
    },

    async revokePermission(roleId, permissionId) {
        try {
            await knex('role_permissions').where({ role_id: roleId, permission_id: permissionId }).del();
        } catch (error) {
            logger.error(`Error revoking permission with ID ${permissionId} from role with ID ${roleId}: ${error.message}`);
            throw error;
        }
    },

    async getRolePermissions(roleId) {
        try {
            const permissions = await knex('roles')
                .join('role_permissions', 'roles.id', '=', 'role_permissions.role_id')
                .join('permissions', 'role_permissions.permission_id', '=', 'permissions.id')
                .where('roles.id', roleId)
                .select('permissions.permission_name');
                
            return permissions.map(permissionObj => permissionObj.permission_name);
        } catch (error) {
            logger.error(`Error fetching permissions for role with ID ${roleId}: ${error.message}`);
            throw error;
        }
    }
};
