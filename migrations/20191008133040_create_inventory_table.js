exports.up = function(knex) {
    return knex.schema.createTable('cars', t => {
        t.increments('id');
        t.bigInteger('vin')
            .unique()
            .notNullable()
            .comment('The cars VIN #');
        t.string('make')
            .notNullable()
            .comment('The car make');
        t.string('model')
            .notNullable()
            .comment('The car model');
        t.integer('milage')
            .notNullable()
            .comment('The cars current milage at time of entry');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
