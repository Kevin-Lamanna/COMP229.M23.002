// Do not expose your credentials in your code
let atlasDB = "mongodb+srv://dbadmin:PwefQFdhYP8bDRTf@clustercomp229.1n2r5i0.mongodb.net/";

// Database setup
let {default: mongoose} = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB).then(() => console.log("====> Connected to MongoDB."));

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    // mongodb.once('open', ()=> {
    //     console.log("====> Connected to MongoDB.")
    // })

    return mongodb;

}