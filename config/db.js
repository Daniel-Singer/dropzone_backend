const mongoose = require('mongoose');
const clc = require('cli-color');

const dbConnect = async () => {
  try{
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(clc.bgBlueBright(`MongoDB connected: ${connect.connection.host}`))
  } catch (error){
    console.error(clc.red(`Error: ${error.message}`));
    process.exit();
  }
};

module.exports = dbConnect;