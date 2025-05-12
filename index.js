const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const history= require('./routes/stockhistory.js');
const calculte = require('./routes/calculate.js');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/stocks', history);
app.use('/api', calculte);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});