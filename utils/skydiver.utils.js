const { JUMPTICKET } = require("../models/jumpticket.model");
const SKYDIVER = require("../models/skydiver.model");

/**
 * 
 * @param {string} _id The id of the jumpticket payer
 */
const calcAccountBalance = async (_id) => {
  const skydiver = await SKYDIVER.findById(_id);
  if (skydiver) {
    const jumptickets = await JUMPTICKET.aggregate([
      {
        $match: {
          payer: skydiver._id,
        },
      },
      {
        $group: {
          _id: "$payer",
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
  };
};

/**
 * 
 * @param {string} _id The ID of the jumpticket user
 */
const calcTotalJumps = async (_id) => {
  const skydiver = await SKYDIVER.findById(_id);
  const jumptickets = await JUMPTICKET.aggregate([
    {
      $match:{
        user: skydiver._id
      }
    },
    {
      $group:{
        _id: '$user._id',
        total:{
          $sum: 1
        }
      }
    }
  ]);

  skydiver.jumpsTotal = jumptickets.length > 0 ? jumptickets[0].total : 0;
  await skydiver.save();
};

module.exports = {
  calcAccountBalance,
  calcTotalJumps
};
