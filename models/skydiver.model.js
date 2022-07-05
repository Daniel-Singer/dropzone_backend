const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { capitalize } = require("../utils/capitalize.utils");

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
    default: false,
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
  },
  accountBalance:{
    type: Number,
    default: 0
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  username:{
    type: String,
    default: ''
  },
  password:{
    type: String,
    default: ''
  }
},{
    timestamps: true
});

skydiverSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

skydiverSchema.pre('save', async function(next){

  if (!this.isModified('password')) {
    next()
  };

    this.firstName = this.firstName.toLowerCase().trim();
    this.lastName = this.lastName.toLowerCase().trim();

    if(this.displayName === ''){
        this.displayName = `${capitalize(this.firstName)} ${capitalize(this.lastName)}`
    };
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

const SKYDIVER = mongoose.model('Skydiver', skydiverSchema);

module.exports = SKYDIVER;
