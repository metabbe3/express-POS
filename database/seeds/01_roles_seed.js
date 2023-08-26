exports.seed = function(knex) {
    return knex('roles').del()
        .then(() => {
            return knex('roles').insert([
                { id: 1, role_name: 'admin', description: 'Super Admin with all permissions' },
                { id: 2, role_name: 'staff', description: 'Staff with limited permissions' },
                { id: 3, role_name: 'user', description: 'Regular user with view permissions' }
            ]);
        });
};
