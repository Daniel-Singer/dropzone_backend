const asyncHandler = require('express-async-handler');

const allData = asyncHandler(async(req,res) => {
    res.sendStatus(404);
});

module.exports = {
    allData
}