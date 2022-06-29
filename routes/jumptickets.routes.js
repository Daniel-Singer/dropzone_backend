const express = require("express");
const {
  allJumpTickets,
  addJumpTicket,
  updateJumpticket,
} = require("../controllers/jumpticket.controllers");
const {
  jumpticketsByDate,
  updateAccountBalance,
} = require("../middleware/jumptickets.middleware");
const router = express.Router();

/**
 *  /api/v1/jumptickets
 */

router
  .route("/")
  .get(jumpticketsByDate, allJumpTickets)
  .post(addJumpTicket);

/**
 * /api/v1/jumptickets/:_id
 */

router.route('/:_id').put(updateJumpticket)

module.exports = router;
