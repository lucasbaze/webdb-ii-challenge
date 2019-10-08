const router = require('express').Router();
const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

router.get('/', async (req, res) => {
    let cars = await db('cars');
    res.status(200).json(cars);
});

module.exports = router;
