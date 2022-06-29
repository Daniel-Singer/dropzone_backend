const asyncHandler = require("express-async-handler");
const { LOAD } = require("../models/load.model");

/**
 * GET All Loads
 */

const allLoads = asyncHandler(async (req, res) => {
    const loads = await LOAD.find({});
    res.status(200).json(loads);
});

/**
 * POST New Load
 * @description Adds new load to database
 */

const addLoad = asyncHandler(async(req,res) => {
    const load = await LOAD.create(req.body);
    res.status(200).json(load);
});

/**
 * GET Specific Load
 */

const oneLoad = asyncHandler(async(req,res) => {
    const { _id } = req.params;
    const load = await LOAD.findById(_id);
    if(load){
        res.status(200).json(load);
    } else {
        res.status(404);
        throw new Error('Load konnte nicht gefunden werden')
    }
});

/**
 * DELETE Specific Load
 */

const deleteLoad = asyncHandler(async(req,res) => {
    const { _id } = req.params;
    const load = await LOAD.findByIdAndDelete(_id);
    if(load){
        res.status(200).json(load);
    } else {
        res.status(400);
        throw new Error('Load konnte nicht gelöscht werden')
    }
});

module.exports = {
  allLoads,
  addLoad,
  oneLoad,
  deleteLoad
};
