const asyncHandler = require('express-async-handler');
const { LOAD } = require('../models/load.model');
const SKYDIVER = require('../models/skydiver.model');
const { jumpticketsOfToday } = require('../utils/jumpticket.utils');
const { addSkydiver } = require('../utils/load.utils');
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

const updateAccountBalance = asyncHandler(async(req,res,next) => {
    const { user } = req.body;
    const updated = await calcAccountBalance(user);
    if(updated){
        next();
    } else {
        res.status(400);
        throw new Error('Ungültige Benutzereingaben')
    }
});


module.exports = {
    jumpticketsByDate,
    updateAccountBalance
};