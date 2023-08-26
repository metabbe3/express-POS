exports.seed = function(knex) {
    return knex('permissions').del()
        .then(() => {
            return knex('permissions').insert([
                { id: 1, permission_name: 'view', description: 'View records' },
                { id: 2, permission_name: 'write', description: 'Write records' },
                { id: 3, permission_name: 'update', description: 'Update records' },
                { id: 4, permission_name: 'delete', description: 'Delete records' }
            ]);
        });
};
