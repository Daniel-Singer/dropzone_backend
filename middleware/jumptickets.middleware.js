const asyncHandler = require('express-async-handler');
const { LOAD } = require('../models/load.model');
const SKYDIVER = require('../models/skydiver.model');
const { jumpticketsOfToday } = require('../utils/jumpticket.utils');
const { calcAccountBalance } = require('../utils/skydiver.utils');

const jumpticketsByDate = asyncHandler(async(req,res, next) => {
    const { date } = req.query;
    if(date){
        const jumptickets = await jumpticketsOfToday(date);
        res.status(200).json(jumptickets);
    } else {
        next()
    };
});



module.exports = {
    jumpticketsByDate
};