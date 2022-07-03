const asyncHandler = require('express-async-handler');
const SKYDIVER = require('../models/skydiver.model');

const filterByRole = asyncHandler(async(req,res,next) => {
    const skydivers = await SKYDIVER.find(req.query);
    if(skydivers){
        res.status(200).json(skydivers);
    } else {
        next();
    }
});

module.exports = {
    filterByRole
}