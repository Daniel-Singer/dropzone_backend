const asyncHandler = require('express-async-handler');
const { jumpticketsOfToday } = require('../utils/jumpticket.utils');

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
}