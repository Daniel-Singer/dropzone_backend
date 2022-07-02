const express = require("express");
const {
  allTickets,
  addTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/tickets.controllers");
const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");

/**
 * @route /api/v1/tickets
 */

router.route("/").get(allTickets).post(addTicket);

/**
 * @route /api/v1/tickets/:_id
 */

router.route("/:_id").put(protect, updateTicket).delete(protect, deleteTicket);

module.exports = router;
