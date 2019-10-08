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
//Create a new car
router.post('/', async (req, res, next) => {
    let { vin, make, model, milage } = req.body;

    if (!vin || !make || !model || !milage) {
        next('Missing parameter');
    }

    let [newCar] = await db.table('cars').insert({ vin, make, model, milage });
    if (!newCar || newCar == null) {
        next('Failed to save car. Try again');
    }
    res.status(200).json({
        message: 'Successfully created new car',
        id: newCar,
    });
});

module.exports = router;
