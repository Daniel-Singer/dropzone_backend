const mongoose = require("mongoose");
const SKYDIVER = require("./skydiver.model");

const jumpticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skydiver",
    },
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skydiver",
    },
    loadRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Load",
    },
    displayName: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jumpticketSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.payer = this.user;
  }
  const skydiver = await SKYDIVER.findById(this.user);

  if (!this.displayName || this.displayName === "") {
    this.displayName = skydiver.displayName;
  }
  next();
});

const JUMPTICKET = mongoose.model("Jumpticket", jumpticketSchema);

exports.jumpticketSchema = jumpticketSchema;
exports.JUMPTICKET = JUMPTICKET;

