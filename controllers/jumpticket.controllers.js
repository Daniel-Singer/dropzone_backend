const asyncHandler = require('express-async-handler');
const { JUMPTICKET } = require('../models/jumpticket.model');
const { LOAD } = require('../models/load.model');

/**
 * GET - All Jumptickets
 */

const allJumpTickets = asyncHandler(async(req,res) => {
    const jumptickets = await JUMPTICKET.find({});
    res.status(200).json(jumptickets);
});

/**
 * POST - New Jumpticket
 */

const addJumpTicket = asyncHandler(async(req,res) => {
    const jumpticket = await JUMPTICKET.create(req.body);
    if(jumpticket){
        const load = await LOAD.findById(jumpticket.loadRef);
        load.skydivers.push(jumpticket);
        await load.save();
        res.status(200).json(jumpticket)
    } else {
        res.status(500);
        throw new Error('Server error')
    }
});

module.exports = {
    allJumpTickets,
    addJumpTicket
}