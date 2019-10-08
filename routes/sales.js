const router = require('express').Router();

//
//Get all sales
router.get('/', (req, res) => {
    res.send('Inside sales');
});

module.exports = router;
