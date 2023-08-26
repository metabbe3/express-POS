exports.up = function(knex) {
    return knex.schema.createTable('permissions', table => {
      table.increments('id').primary();
      table.string('permission_name').unique().notNullable();
      table.string('description').nullable();
      table.timestamp('deleted_at');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('permissions');
  };
  