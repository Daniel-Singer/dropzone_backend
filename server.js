const express = require('express');
const clc = require('cli-color');
const cors = require('cors');
require('dotenv').config();

const app = express();

require('./config/db')();

app.use(express.json());
app.use(cors());

// Routing

app.use('/api/v1/loads', require('./routes/load.routes'))

app.listen(process.env.PORT, () => {
    console.log(clc.green(`Server running on Port ${process.env.PORT}`))
});