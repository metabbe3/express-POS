const bcrypt = require('bcrypt');

exports.seed = function(knex) {
    return knex('users').del()
        .then(() => {
            return knex('users').insert([
                {
                    username: 'admin',
                    full_name: 'Super Admin',
                    email: 'admin@example.com',
                    password_hash: bcrypt.hashSync('admin', 10)
                },
                {
                    username: 'staff',
                    full_name: 'Staff Member',
                    email: 'staff@example.com',
                    password_hash: bcrypt.hashSync('staff', 10)
                },
                {
                    username: 'user',
                    full_name: 'Regular User',
                    email: 'user@example.com',
                    password_hash: bcrypt.hashSync('user', 10)
                }
            ]);
        });
};
