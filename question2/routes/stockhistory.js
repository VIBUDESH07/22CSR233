const express = require('express');
const router = express.Router();
const {stockfet,avg} = require('../controllers/supporters.js');

router.get('/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;
    console.log(ticker, minutes, aggregation);
    const prices = await stockfet(ticker, minutes);
    const averageStockPrice = avg(prices);
    res.json({
        averageStockPrice,
        prices,
    });
});
module.exports = router;