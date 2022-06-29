const asyncHandler = require('express-async-handler');
const { JUMPTICKET } = require('../models/jumpticket.model');

/**
 * GET - All Jumptickets
 */

const allJumpTickets = asyncHandler(async(req,res) => {
    const jumptickets = await JUMPTICKET.find({});
    res.status(200).json(jumptickets);
});

module.exports = {
    allJumpTickets
}