exports.seed = function(knex) {
    return knex('role_permissions').del()
        .then(() => {
            return knex('role_permissions').insert([
                // Admin has all permissions
                { role_id: 1, permission_id: 1 },
                { role_id: 1, permission_id: 2 },
                { role_id: 1, permission_id: 3 },
                { role_id: 1, permission_id: 4 },

                // Staff has view, write, update
                { role_id: 2, permission_id: 1 },
                { role_id: 2, permission_id: 2 },
                { role_id: 2, permission_id: 3 },

                // User has only view
                { role_id: 3, permission_id: 1 }
            ]);
        });
};
