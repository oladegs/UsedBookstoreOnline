// Do not expose your credentials in your code.
let config = require('./backend/config');

// Database setup
const mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(config.ATLASDB);

    let mongodb = mongoose.connection;

    mongodb.on('error', 
        console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log("====> CONNECTION TO DATABASE WAS SUCCESSFULL !! ");
    })

    return mongodb;

}