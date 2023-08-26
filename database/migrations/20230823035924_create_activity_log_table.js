exports.up = function(knex) {
    return knex.schema.createTable('activity_log', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.enu('activity_type', ['login', 'logout', 'insert', 'update', 'delete', 'failed-login']).notNullable();
      table.string('description').nullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('activity_log');
  };
  