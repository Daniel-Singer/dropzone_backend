const mongoose = require("mongoose");

const skydiverSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
  address: {
    street: {
      type: String,
      default: "",
    },
    houseNr: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  insurance: {
    type: String,
    default: "",
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  isTandem: {
    type: Boolean,
    default: false,
  },
  isPassenger: {
    type: Boolean,
    default: false,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isInstructor: {
    type: Boolean,
    default: false,
  },
  isGuest: {
    type: Boolean,
    default: true,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
  license:{
    type: String,
    default: ''
  },
  jumpsTotal:{
    type: Number,
    default: 0
  },
  jumpsHere:{
    type: Number,
    default: 0
  }
},{
    timestamps: true
});

skydiverSchema.pre('save', function(next){

    this.firstName = this.firstName.toLowerCase().trim();
    this.lastName = this.lastName.toLowerCase().trim();

    if(this.displayName === ''){
        this.displayName = `${this.firstName} ${this.lastName}`
    };
    next();
});

const SKYDIVER = mongoose.model('Skyidver', skydiverSchema);

module.exports = SKYDIVER;
