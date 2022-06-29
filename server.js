const express = require('express');
const clc = require('cli-color');
require('dotenv').config();

const app = express();

require('./config/db')();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(clc.green(`Server running on Port ${process.env.PORT}`))
});