const mongoose = require('mongoose');
const dbConnect = require('./config/db');
const { skydivers } = require('./seederdata/skydivers');
const { planes } = require('./seederdata/planes');
const { tickets } = require('./seederdata/tickets');

const dotenv = require('dotenv');
const SKYDIVER = require('./models/skydiver.model');
const { PLANE } = require('./models/plane.model');
const TICKET = require('./models/ticket.model');
// const transformSkydivers = require('./seederdata/convertJsonSkydivers');

dotenv.config();

dbConnect();

/**
 * Resets Database or imports data into db when the application runs for the first time
 */

const importData = async () => {
    try {
        await SKYDIVER.deleteMany();
        await PLANE.deleteMany();
        await TICKET.deleteMany();
        // await transformSkydivers();

        for await (let entry of skydivers){
            const skydiver = await SKYDIVER.create(entry);
        }
        const createdPlanes = await PLANE.insertMany(planes);
        const createdTickets = await TICKET.insertMany(tickets);

        console.log('Data imported!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

/**
 * Destroys data for develepment purposes only
 */

const destroyData = async() => {
    await SKYDIVER.deleteMany();
    process.exit();
};

if(process.argv[2] === '-destroy'){
    destroyData();
} else {
    importData();
}