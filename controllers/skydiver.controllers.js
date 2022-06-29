const asyncHandler = require('express-async-handler');
const SKYDIVER = require('../models/skydiver.model');

/**
 * GET - All Skydivers
 */

const allSkydivers = asyncHandler(async(req,res) => {
    const skydivers = await SKYDIVER.find({});
    res.status(200).json(skydivers);
});

/**
 * GET - Specific Skydiver
 */

const oneSkydiver = asyncHandler(async(req,res) => {
    const { _id } = req.params;
    const skydiver = await SKYDIVER.findById(_id);
    if(skydiver){
        res.status(200).json(skydiver);
    } else {
        res.status(404);
        throw new Error(`Der gesuchte Skydiver konnte nicht gefunden werden.`);
    };
});

/**
 * POST - New Skydiver
 */

const addSkydiver = asyncHandler(async(req,res) => {
    const { firstName, lastName } = req.body;
    const doesExist = await SKYDIVER.findOne({firstName,lastName});
    if(!doesExist){
        const skydiver = await SKYDIVER.create(req.body);
        res.status(200).json(skydiver);
    } else {
        res.status(400);
        throw new Error(`Der Springer ${firstName.toUpperCase()} ${lastName.toUpperCase()} existiert bereits`)
    }
});

/**
 * DELETE - Delete Skydiver
 */

// TODO - Dlete skydiver route implementieren

module.exports = {
    allSkydivers,
    addSkydiver,
    oneSkydiver
};