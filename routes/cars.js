const router = require('express').Router();
const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

//
//Get all cars
router.get('/', async (req, res) => {
    let cars = await db('cars');
    res.status(200).json(cars);
});

//
//Get cars and sales
router.get('/sales', async (req, res, next) => {
    let carSales = await db('cars').join(
        'sales',
        'cars.id',
        '=',
        'sales.car_id'
    );
    res.status(200).json(carSales);
});

//
//Get specific car
router.get('/:id', validateID, (req, res) => {
    res.status(200).json(req.car);
});

//
//Create a new car
router.post('/', async (req, res, next) => {
    let {
        vin,
        make,
        model,
        milage,
        transmission_type = null,
        title = null,
    } = req.body;

    if (!vin || !make || !model || !milage) {
        next('Missing parameter');
    }

    let [newCar] = await db
        .table('cars')
        .insert({ vin, make, model, milage, transmission_type, title });
    if (!newCar || newCar == null) {
        next('Failed to save car. Try again');
    }
    res.status(200).json({
        message: 'Successfully created new car',
        id: newCar,
    });
});

//
//Update car record
router.put('/:id', validateID, async (req, res, next) => {
    let { id } = req.params;
    let {
        make,
        model,
        milage,
        transmission_type = null,
        title = null,
    } = req.body;

    if (!make || !model || !milage) {
        next('Missing parameter');
    }

    try {
        let [updatedCar] = await db
            .table('cars')
            .update({ make, model, milage, transmission_type, title })
            .where('id', id);
        if (!updatedCar || updatedCar == null) {
            next('Failed to update car. Try again');
        }
        res.status(200).json({
            message: 'Successfully updated car',
            id: updatedCar,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//
//Delete Car from inventory
router.delete('/:id', validateID, async (req, res) => {
    let { id } = req.params;
    let deleted = await db('cars')
        .where('id', id)
        .del();
    res.status(200).json(deleted);
});

//
//Middleware
async function validateID(req, res, next) {
    let { id } = req.params;
    let validated = await db
        .select()
        .table('cars')
        .where('id', id);
    if (!validated || validated.length == 0) {
        next('Not a valid id');
    }
    req.car = validated;
    next();
}

module.exports = router;
