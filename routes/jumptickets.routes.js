const express = require('express');
const { allJumpTickets } = require('../controllers/jumpticket.controllers');
const { jumpticketsByDate } = require('../middleware/jumptickets.middleware');
const router = express.Router();

/**
 * GET
 * @route /api/v1/jumptickets
 */

router.route('/').get(jumpticketsByDate, allJumpTickets);

module.exports = router;
