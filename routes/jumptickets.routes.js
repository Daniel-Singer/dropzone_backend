const express = require("express");
const {
  allJumpTickets,
  addJumpTicket,
} = require("../controllers/jumpticket.controllers");
const {
  jumpticketsByDate,
  updateAccountBalance,
} = require("../middleware/jumptickets.middleware");
const router = express.Router();

/**
 * GET
 * @route /api/v1/jumptickets
 */

router
  .route("/")
  .get(jumpticketsByDate, allJumpTickets)
  .post(addJumpTicket);

module.exports = router;
