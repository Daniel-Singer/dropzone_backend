const mongoose = require("mongoose");
const { planeSchema } = require("./plane.model");

const loadSchema = mongoose.Schema(
  {
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    plane: { 
        type: planeSchema
    },
    startedAt: {
      type: Date,
      default: null,
    },
    droppedAt: {
      type: Date,
      default: null,
    },
    landedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const LOAD = mongoose.model("Load", loadSchema);

exports.loadSchema = loadSchema;
exports.LOAD = LOAD;
