exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('cars').insert([
                {
                    vin: 1234567891,
                    make: 'Dodge',
                    model: 'ram',
                    milage: 127065,
                    transmission_type: 'manual',
                    title: 'preowned',
                },
                {
                    vin: 1234567892,
                    make: 'Tesla',
                    model: 'model 3',
                    milage: 53000,
                    transmission_type: 'automatic',
                    title: 'clean',
                },
                {
                    vin: 1234567893,
                    make: 'Tesla',
                    model: 'model S',
                    milage: 54000,
                    transmission_type: 'automatic',
                    title: 'clean',
                },
            ]);
        });
};
