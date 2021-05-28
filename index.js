const express = require('express');
const port = 8002;

const app = express();
const expressLayout = require('express-ejs-layouts')


app.use(expressLayout);
app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log('error in setting server');
        return;
    }
    console.log('server is up');

})