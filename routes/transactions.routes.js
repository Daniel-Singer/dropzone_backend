const express = require('express');
const { allTransactions, addTransaction, skydiverTransactions } = require('../controllers/transactions.controllers');
const router = express.Router();


/**
 * @route /api/v1/transactions
 * @description returns all transactions
 */

router.route('/').get(allTransactions).post(addTransaction);

/**
 * @route /api/v1/transactions/:_id
 * @description returns transactions for specific skydiver
 */

router.route('/:_id').get(skydiverTransactions)

module.exports = router;