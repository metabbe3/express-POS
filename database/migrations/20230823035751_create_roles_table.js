exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
      table.increments('id').primary();
      table.string('role_name').unique().notNullable();
      table.string('description').nullable();
      table.timestamp('deleted_at');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('roles');
  };
  