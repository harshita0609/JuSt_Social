const express = require('express');
const app = express();
const port = 8002;


app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log('error in setting server');
        return;
    }
    console.log('server is up');

})