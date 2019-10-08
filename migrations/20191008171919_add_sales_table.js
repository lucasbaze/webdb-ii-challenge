exports.up = function(knex) {
    return knex.schema.createTable('sales', t => {
        t.increments('id');
        t.integer('car_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('cars')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        t.float('sold_price', 2)
            .unsigned()
            .notNullable()
            .comment('The price the car was sold');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sales');
};
