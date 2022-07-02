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
        required: true,
        default: 1200
    }
});

planeSchema.pre('save', function(next){
    this.name = this.name.toLowerCase();
    this.license = this.license.toLowerCase();
    next()
});

const PLANE = mongoose.model('Plane', planeSchema);

exports.planeSchema = planeSchema;
exports.PLANE = PLANE;