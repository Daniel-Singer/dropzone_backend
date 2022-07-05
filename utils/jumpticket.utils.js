const { JUMPTICKET } = require("../models/jumpticket.model");

const jumpticketsOfToday = async (date, options) => {

    const tomorrow = new Date(date);

    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log(options)

    const jumptickets = await JUMPTICKET.aggregate([
        { 
            $match:{
                'createdAt':{
                    $gte: new Date(date),
                    $lt: tomorrow
                }
            }
        }
    ]);

    return jumptickets;
};

module.exports = {
    jumpticketsOfToday
}