exports.up = function(knex) {
    return knex.schema.table('cars', t => {
        t.string('transmission_type')
            .defaultTo('unknown')
            .comment('Options: manual, automatic');
        t.string('title')
            .defaultTo('unknown')
            .comment('Options: clean, salvage, preowned');
    });
};

exports.down = function(knex) {
    return knex.schema.table('cars', t => {
        t.dropColumns('transmission_type', 'title');
    });
};
