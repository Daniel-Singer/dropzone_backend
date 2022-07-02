const asyncHandler = require("express-async-handler");
const TICKET = require("../models/ticket.model");

/**
 * GET - All Tickets
 */

const allTickets = asyncHandler(async (req, res) => {
  const tickets = await TICKET.find({});
  res.status(200).json(tickets);
});

/**
 * POST - New Ticket
 */

const addTicket = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const doesExist = await TICKET.findOne({ name: name.toLowerCase() });
  if (!doesExist) {
    const ticket = await TICKET.create(req.body);
    res.status(200).json(ticket);
  } else {
    res.status(400);
    throw new Error("Ticket existiert bereits");
  }
});

/**
 * PUT - Update Ticket
 */

const updateTicket = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const update = req.body;
  const ticket = await TICKET.findByIdAndUpdate(_id, update, { new: true });
  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(400);
    throw new Error("Ticket konnte nicht gefunden werden");
  }
});

/**
 * DELETE - Delete Ticket
 */

const deleteTicket = asyncHandler(async(req,res) => {
    const { _id } = req.params;
    const ticket = await TICKET.findByIdAndDelete(_id);
    if(ticket){
        res.status(200).json(ticket);
    } else {
        res.status(404);
        throw new Error('Ticket konnte nicht gefunden werden. Löschen nicht möglich')
    };
});

module.exports = {
  allTickets,
  addTicket,
  updateTicket,
  deleteTicket
};
