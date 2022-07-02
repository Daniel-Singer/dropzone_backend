const express = require('express');
const { allTransactions, addTransaction } = require('../controllers/transactions.controllers');
const router = express.Router();


/**
 * @route /api/v1/transactions
 * @description returns all transactions
 */

router.route('/').get(allTransactions).post(addTransaction);

module.exports = router;