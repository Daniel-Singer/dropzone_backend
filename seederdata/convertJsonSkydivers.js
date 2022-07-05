const fs = require('fs');
const path = require('path');
const SKYDIVER = require('../models/skydiver.model');

const transformSkydivers = async () => {
    const json = fs.readFileSync(path.join(__dirname, 'skydiversJson.json'));
    const entries = JSON.parse(json);
    const skydivers = [];
    entries.forEach((entry) => {
        const { FirstName, LastName, eMail, Mobil} = entry;
        skydivers.push({
            firstName: FirstName,
            lastName: LastName,
            displayName: `${FirstName} ${LastName}`,
            email: eMail,
            phone: Mobil
        })
    });
    for await (let entry of skydivers){
        const skydiver = await SKYDIVER.create(entry);
    };
};

module.exports = transformSkydivers;