const knex = require('knex')(require('../../knexfile').development);

const getAllPermissions = async () => {
    return await knex('permissions');
};

const createPermission = async (permissionData) => {
    return await knex('permissions').insert(permissionData).returning('*');
};

const updatePermission = async (permissionId, updates) => {
    return await knex('permissions').where({ id: permissionId }).update(updates).returning('*');
};

const deletePermission = async (permissionId) => {
    return await knex('permissions').where({ id: permissionId }).delete();
};

module.exports = {
    getAllPermissions,
    createPermission,
    updatePermission,
    deletePermission
};
