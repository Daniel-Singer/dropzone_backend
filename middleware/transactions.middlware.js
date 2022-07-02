const asyncHandler = require('express-async-handler');
const TRANSACTION = require('../models/transaction.model');
const { transactionsOfToday } = require('../utils/transactions.utils');

const transactionsByDate = asyncHandler(async(req,res,next) => {
    const { date } = req.query;
    if(date){
        const transactions = await transactionsOfToday(date);
        res.status(200).json(transactions);
    } else {
        next()
    }
});

module.exports = {
    transactionsByDate
}