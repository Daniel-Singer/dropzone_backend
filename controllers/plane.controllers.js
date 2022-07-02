const asyncHandler = require("express-async-handler");
const { PLANE } = require("../models/plane.model");

/**
 * GET - All Planes
 */

const allPlanes = asyncHandler(async (req, res) => {
  const planes = await PLANE.find({});
  res.status(200).json(planes);
});

/**
 * POST - New Plane
 */

const addPlane = asyncHandler(async (req, res) => {
  const { name, license } = req.body;
  const doesExist = await PLANE.findOne({ license });
  if (!doesExist) {
    const plane = await PLANE.create(req.body);
    res.status(200).json(plane);
  } else {
    res.status(400);
    throw new Error("Flugzeug bereits angelegt");
  }
});

/**
 * PUT - Update Plane
 */

const updatePlane = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const update = req.body;
  const plane = await PLANE.findByIdAndUpdate(_id, update, { new: true });
  if(plane){
    res.status(200).json(plane);
  } else {
    res.status(404);
    throw new Error('Flugzeug nicht gefunden. Update nicht möglich')
  }
});

/**
 * DELETE - Delete Plane
 */

const deletePlane = asyncHandler(async(req,res) => {
    const { _id } = req.params;
    const plane = await PLANE.findByIdAndDelete(_id);
    if(plane){
        res.status(200).json(plane);
    } else {
        res.status(400);
        throw new Error('Flugzeug konnte nicht gefunden werden')
    }
});


module.exports = {
  allPlanes,
  addPlane,
  updatePlane,
  deletePlane
};
