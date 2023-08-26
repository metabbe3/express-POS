exports.seed = function(knex) {
    return knex('user_roles').del()
        .then(() => {
            return knex('user_roles').insert([
                { user_id: 1, role_id: 1 },  // Super Admin
                { user_id: 2, role_id: 2 },  // Staff
                { user_id: 3, role_id: 3 }   // Regular User
            ]);
        });
};
