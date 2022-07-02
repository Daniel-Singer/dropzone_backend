const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    roles: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TICKET = mongoose.model("Ticket", ticketSchema);

module.exports = TICKET;