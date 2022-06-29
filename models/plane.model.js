const mongoose = require('mongoose');

const planeSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    license:{
        type: String,
        default: ''
    },
    capacity:{
        type: Number,
        required: true
    },
    climbingTime:{
        type: Number,
        required: true
    }
});

const PLANE = mongoose.model('Plane', planeSchema);

exports.planeSchema = planeSchema;
exports.PLANE = PLANE;