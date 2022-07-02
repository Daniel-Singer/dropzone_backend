const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    payer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skydiver'
    },
    description:{
        type: String,
        default: ''
    },
    amount:{
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const TRANSACTION = mongoose.model('Transaction', transactionSchema);

module.exports = TRANSACTION;