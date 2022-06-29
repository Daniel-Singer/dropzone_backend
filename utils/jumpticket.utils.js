const { JUMPTICKET } = require("../models/jumpticket.model");

const jumpticketsOfToday = async (date) => {
    const tomorrow = new Date(date);

    tomorrow.setDate(tomorrow.getDate() + 1);

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