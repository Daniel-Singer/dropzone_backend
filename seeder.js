const mongoose = require('mongoose');
const dbConnect = require('./config/db');
const { skydivers } = require('./seederdata/skydivers');
const { planes } = require('./seederdata/planes');

const dotenv = require('dotenv');
const SKYDIVER = require('./models/skydiver.model');
const { PLANE } = require('./models/plane.model');

dotenv.config();

dbConnect();

const importData = async () => {
    try {
        await SKYDIVER.deleteMany();
        await PLANE.deleteMany();
    } catch (error) {
        
    }
}