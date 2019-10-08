const router = require('express').Router();
const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

//
//Get all sales
router.get('/', async (req, res) => {
    let sales = await db.select().table('sales');
    res.status(200).json(sales);
});

//
//Post new sales
router.post('/', async (req, res, next) => {
    let { car_id, sold_price } = req.body;

    if (!car_id || !sold_price) {
        next('Missing parameters card_id or sold_price');
    }

    try {
        let newSale = await db('sales').insert({
            car_id,
            sold_price,
        });
        if (!newSale || newSale == null) {
            next('There was an error saving new sale');
        }
        res.status(200).json(newSale);
    } catch (err) {
        next('There was an error saving new sale');
    }
});

module.exports = router;
