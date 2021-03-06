const jwt = require('jsonwebtoken');

const { JUMPTICKET } = require("../models/jumpticket.model");
const SKYDIVER = require("../models/skydiver.model");
const TRANSACTION = require('../models/transaction.model');

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

    const transactions = await TRANSACTION.aggregate([
      {
        $match:{
          payer: skydiver._id
        }
      },
      {
        $group:{
          _id:null,
          total:{
            $sum: "$amount"
          }
        }
      }
    ]);

    let jumpticketsTotal  = 0;

    if(jumptickets.length > 0){
      jumpticketsTotal = jumptickets[0].total ? jumptickets[0].total : 0;
    };

    let transactionsTotal = 0;

    if(transactions.length > 0){
      transactionsTotal = transactions[0].total ? transactions[0].total : 0;
    };

    skydiver.accountBalance = (jumpticketsTotal * -1) + transactionsTotal;

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

const generateToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {
    expiresIn: '14h'
  })
};

module.exports = {
  calcAccountBalance,
  calcTotalJumps,
  generateToken
};
