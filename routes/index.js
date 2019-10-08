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

    if (!vin || !make || !modal || !milage) {
        next('Missing parameter');
    }

    let newCar = await db.table('cars').insert({});
});

module.exports = router;
