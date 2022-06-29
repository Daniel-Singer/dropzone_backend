const { JUMPTICKET } = require("../models/jumpticket.model");
const SKYDIVER = require("../models/skydiver.model");

const calcAccountBalance = async (_id) => {
  const skydiver = await SKYDIVER.findById(_id);
  if (skydiver) {
    const jumptickets = await JUMPTICKET.aggregate([
      {
        $match: {
          user: skydiver._id,
        },
      },
      {
        $group: {
          _id: "$user",
          total: {
            $sum: "$value",
          },
        },
      },
    ]);

    let jumpticketsTotal  = 0;

    if(jumptickets.length > 0){
      jumpticketsTotal = jumptickets[0].total ? jumptickets[0].total : 0;
    };

    skydiver.accountBalance = (jumpticketsTotal * -1);

    await skydiver.save();
    return true;
  } else {
    return false;
  }
};

module.exports = {
  calcAccountBalance,
};
