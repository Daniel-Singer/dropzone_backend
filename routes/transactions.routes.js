const express = require("express");
const {
  allTransactions,
  addTransaction,
  skydiverTransactions,
  deleteTransaction,
} = require("../controllers/transactions.controllers");
const { protect, admin } = require("../middleware/auth.middleware");
const { transactionsByDate } = require("../middleware/transactions.middlware");
const router = express.Router();

/**
 * @route /api/v1/transactions
 * @description returns all transactions
 */

router.route("/").get(transactionsByDate, allTransactions).post(addTransaction);

/**
 * @route /api/v1/transactions/:_id
 * @description Requests for specific transaction
 */

router.route("/:_id").delete(protect, admin, deleteTransaction);

/**
 * @route /api/v1/transactions/skydiver/:_id
 * @description returns transactions for specific skydiver
 */

router.route("/skydiver/:_id").get(skydiverTransactions);

module.exports = router;
