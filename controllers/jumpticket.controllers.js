const asyncHandler = require("express-async-handler");
const { JUMPTICKET } = require("../models/jumpticket.model");
const { LOAD } = require("../models/load.model");
const {
  calcAccountBalance,
  calcTotalJumps,
} = require("../utils/skydiver.utils");

/**
 * GET - All Jumptickets
 */

const allJumpTickets = asyncHandler(async (req, res) => {
  const jumptickets = await JUMPTICKET.find({})
    .populate("payer")
    .populate("user");
  res.status(200).json(jumptickets);
});

/**
 * POST - New Jumpticket
 */

const addJumpTicket = asyncHandler(async (req, res) => {
  const jumpticket = await JUMPTICKET.create(req.body);
  if (jumpticket) {
    const load = await LOAD.findById(jumpticket.loadRef);
    load.skydivers.push(jumpticket);

    await calcAccountBalance(jumpticket.payer);
    await calcTotalJumps(jumpticket.user);

    await load.save();
    await jumpticket.populate("user");
    await jumpticket.populate("payer");

    res.status(200).json(jumpticket);
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

/**
 * PUT - Update Jumpticket
 */

const updateJumpticket = asyncHandler(async (req, res) => {

  const { _id } = req.params;
  const update = req.body;

  const jumpticket = await JUMPTICKET.findByIdAndUpdate(_id, update, {
    new: true,
  });

  if (jumpticket) {

    await calcAccountBalance(jumpticket.payer);
    await calcTotalJumps(jumpticket.user);

    await jumpticket.populate("user");
    await jumpticket.populate("payer");

    res.status(200).json(jumpticket);

  } else {
    res.status(404);
    throw new Error("Jumpticket konnte nicht gefunden werden");
  };
  // TODO - Methode hinzufügen damit der kontostand und die sprunganzahl des vorherigen springer angepasst wird
  
});

module.exports = {
  allJumpTickets,
  addJumpTicket,
  updateJumpticket,
};
