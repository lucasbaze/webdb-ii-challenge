exports.up = function(knex) {
    return knex.schema.table('cars', t => {
        t.string('transmission_type')
            .nullable()
            .defaultTo('unknown')
            .comment('Options: manual, automatic');
        t.string('title')
            .nullable()
            .defaultTo('unknown')
            .comment('Options: clean, salvage, preowned');
    });
};

exports.down = function(knex) {
    return knex.schema.table('cars', t => {
        t.dropColumns('transmission_type', 'title');
    });
};
