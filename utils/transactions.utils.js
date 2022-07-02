const TRANSACTION = require("../models/transaction.model");

const transactionsOfToday = async (date) => {
    const tomorrow = new Date(date);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const transactions = await TRANSACTION.aggregate([
        { 
            $match:{
                'createdAt':{
                    $gte: new Date(date),
                    $lt: tomorrow
                }
            }
        }
    ]);

    return transactions;
};

module.exports = {
    transactionsOfToday
}