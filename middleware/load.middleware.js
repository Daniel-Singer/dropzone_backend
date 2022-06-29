const asyncHandler = require('express-async-handler');
const { LOAD } = require('../models/load.model');
const { loadsOfToday } = require('../utils/load.utils');

const loadsByDate = asyncHandler(async(req,res, next) => {
    const { date } = req.query;
    if(date){
        const loads = await loadsOfToday(date);
        res.status(200).json(loads);
    } else {
        next()
    };
});

module.exports = {
    loadsByDate
}