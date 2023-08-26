const knex = require('../utils/connection');
const logger = require('../utils/logger');

module.exports = {
    async assignRole(userId, roleId) {
        try {
            await knex('user_roles').insert({ user_id: userId, role_id: roleId });
        } catch (error) {
            logger.error(`Error assigning role with ID ${roleId} to user with ID ${userId}: ${error.message}`);
            throw error;
        }
    },

    async revokeRole(userId, roleId) {
        try {
            await knex('user_roles').where({ user_id: userId, role_id: roleId }).del();
        } catch (error) {
            logger.error(`Error revoking role with ID ${roleId} from user with ID ${userId}: ${error.message}`);
            throw error;
        }
    }
};
