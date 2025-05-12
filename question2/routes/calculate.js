
const express = require('express');
const router = express.Router();


const {stockfet,cor,avg} = require('../controllers/supporters.js');


router.get('/stockcorrelation', async (req, res) => {
    const { minutes, ticker } = req.query;
    console.log(ticker[0])
    const [ticker1, ticker2] = ticker.split(',');
    console.log(ticker1,ticker2);
    const [history1, history2] = await Promise.all([
        stockfet(ticker1, minutes),
        stockfet(ticker2, minutes),
    ]);
    console.log(history1,history2)
    const prices1 = history1.price;
    const prices2 = history2.price;

    const correlation = cor(prices1, prices2);

    res.json({
        correlation,
        stocks: {
            [ticker1]: {
                averagePrice: avg(history1),
                priceHistory: history1,
            },
            [ticker2]: {
                averagePrice: avg(history2),
                priceHistory: history2,
            },
        },
    });
});




module.exports=router;