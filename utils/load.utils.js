const { LOAD } = require("../models/load.model");

const loadsOfToday = async (date) => {
    const tomorrow = new Date(date);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const loads = await LOAD.aggregate([
        { 
            $match:{
                'createdAt':{
                    $gte: new Date(date),
                    $lt: tomorrow
                }
            }
        }
    ]);

    return loads;
};

module.exports = {
    loadsOfToday
}