const asyncHandler = require('express-async-handler');
const { JUMPTICKET } = require('../models/jumpticket.model');
const { jumpticketsOfToday } = require('../utils/jumpticket.utils');

const getTodaysData = asyncHandler(async(req,res,next) => {
    const { date } = req.query;
    if(date){
        const jumpticketsTotal = await JUMPTICKET.find({}).countDocuments();
        const today = await jumpticketsOfToday(date, { groupBy: 'user'});

        console.log(jumpticketsTotal);
        res.status(200).json({
            jumptickets:{
                total: jumpticketsTotal,
                today
            }
        });
    } else {
        next();
    }
});

const getDataFromTill = asyncHandler(async(req,res,next) => {
    const { from, till } = req.query;
    if(from && till){

    } else {
        next();
    };
});

module.exports = {
    getTodaysData
}