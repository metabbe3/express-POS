const knex = require('../utils/connection');
const logger = require('../utils/logger');

module.exports = {
    async getAllRoles() {
        try {
            return await knex('roles');
        } catch (error) {
            logger.error(`Error fetching roles: ${error.message}`);
            throw error;
        }
    },

    async createRole(roleData) {
        try {
            const result = await knex('roles').insert(roleData).returning('*');
            return result[0];
        } catch (error) {
            logger.error(`Error creating role: ${error.message}`);
            throw error;
        }
    },

    async updateRole(roleId, updatedData) {
        try {
            await knex('roles').where('id', roleId).update(updatedData);
            return this.findById(roleId);
        } catch (error) {
            logger.error(`Error updating role with ID ${roleId}: ${error.message}`);
            throw error;
        }
    },

    findById(roleId) {
        return knex('roles').where('id', roleId).first();
    },

    async deleteRole(roleId) {
        try {
            await knex('roles').where('id', roleId).del();
        } catch (error) {
            logger.error(`Error deleting role with ID ${roleId}: ${error.message}`);
            throw error;
        }
    }
};
