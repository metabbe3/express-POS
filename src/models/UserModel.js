const knex = require('../utils/connection');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(userData) {
        try {
            const [insertedId] = await knex('users').insert(userData);
            return this.findById(insertedId);
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            throw new Error('Unable to create the user.');
        }
    },

    async update(userId, updatedData) {
        try {
            await knex('users').where('id', userId).update(updatedData);
            return this.findById(userId);
        } catch (error) {
            logger.error(`Error updating user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to update the user.');
        }
    },

    async delete(userId) {
        try {
            await knex('users').where('id', userId).update({ deleted_at: knex.fn.now() });
        } catch (error) {
            logger.error(`Error deleting user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to delete the user.');
        }
    },

    findById(userId) {
        return knex('users').where('id', userId).whereNull('deleted_at').first();
    },

    async findByEmail(email) {
        try {
            return await knex('users').where('email', email).whereNull('deleted_at').first();
        } catch (error) {
            logger.error(`Error fetching user with email ${email}: ${error.message}`);
            throw new Error('Unable to fetch user details by email.');
        }
    },

    async getPermissions(userId) {
        try {
            const permissions = await knex('users')
                .join('user_roles', 'users.id', '=', 'user_roles.user_id')
                .join('roles', 'user_roles.role_id', '=', 'roles.id')
                .join('role_permissions', 'roles.id', '=', 'role_permissions.role_id')
                .join('permissions', 'role_permissions.permission_id', '=', 'permissions.id')
                .where({
                    'users.id': userId,
                    'users.deleted_at': null
                })
                .select('permissions.permission_name');

                
            return permissions.map(permissionObj => permissionObj.permission_name);
        } catch (error) {
            logger.error(`Error fetching permissions for user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to fetch user permissions.');
        }
    },

    async getUserRoles(userId) {
        try {
            const roles = await knex('users')
                .join('user_roles', 'users.id', '=', 'user_roles.user_id')
                .join('roles', 'user_roles.role_id', '=', 'roles.id')
                .where('users.id', userId)
                .select('roles.id');
    
            return roles.map(roleObj => roleObj.id);
        } catch (error) {
            logger.error(`Error fetching roles for user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to fetch user roles.');
        }
    },

    async getUserRolesAndPermissions(userId) {
        try {
            const roles = await this.getUserRoles(userId);
            const permissions = await this.getPermissions(userId);
            return {
                roles: roles,
                permissions: permissions
            };
        } catch (error) {
            logger.error(`Error fetching roles and permissions for user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to fetch roles and permissions.');
        }
    },

    async registerUser(username, email, password, full_name, phone_number = null) {
        try {
            const existingUserByUsername = await this.findByUsername(username);
            if (existingUserByUsername) {
                throw new Error("The provided username is already taken. Please choose another one.");
            }

            const existingUserByEmail = await this.findByEmail(email);
            if (existingUserByEmail) {
                throw new Error("The provided email is already registered. Please log in or use another email.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const [insertedId] = await knex('users').insert({
                username: username,
                email: email,
                full_name: full_name,
                phone_number: phone_number,
                password_hash: hashedPassword,
                created_at: knex.fn.now(),
                updated_at: knex.fn.now()
            });
            
            return this.findById(insertedId);
        } catch (error) {
            logger.error(`Error registering user: ${error.message}`);
            throw error;
        }
    },

    async findByUsername(username) {
        try {
            return await knex('users').where('username', username).whereNull('deleted_at').first();
        } catch (error) {
            logger.error(`Error fetching user with username ${username}: ${error.message}`);
            throw new Error('Unable to fetch user details by username.');
        }
    },

    async updateLastLogin(userId) {
        try {
            await knex('users').where('id', userId).update({ last_login: knex.fn.now() });
        } catch (error) {
            logger.error(`Error updating last login for user with ID ${userId}: ${error.message}`);
            throw new Error('Unable to update user login timestamp.');
        }
    }
};
