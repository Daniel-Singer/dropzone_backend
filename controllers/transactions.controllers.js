const asyncHandler = require('express-async-handler');
const TRANSACTION = require('../models/transaction.model');
const { calcAccountBalance } = require('../utils/skydiver.utils');

/**
 * GET - All Transactions
 */

const allTransactions = asyncHandler(async(req,res) => {
    const transactions = await TRANSACTION.find({}).populate('payer');
    if(transactions){
        res.status(200).json(transactions);
    } else {
        res.status(500);
        throw new Error('Server Error!')
    }
});

/**
 * POST - New Transaction
 */

const addTransaction = asyncHandler(async(req,res) => {
    const transaction = await TRANSACTION.create(req.body);
    if(transaction){
        await calcAccountBalance(transaction.payer);
        await transaction.populate('payer');
        res.status(200).json(transaction);
    } else {
        res.status(500);
        throw new Error('Server Error! Ungültige Eingaben')
    }
})

module.exports = {
    allTransactions,
    addTransaction
}