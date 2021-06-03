const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/just_social_dev');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to db"));

db.once('open', function(){
    console.log("successfully connected to db");    //  when dp opens do this function
});

module.exports= db;