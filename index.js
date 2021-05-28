const express = require('express');
const port = 8002;
const app = express();

// layouts
const expressLayout = require('express-ejs-layouts')
app.use(expressLayout);

// static files assets
app.use(express.static('./assets'));

// router
app.use('/',require('./routes'));


// view template
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log('error in setting server');
        return;
    }
    console.log('server is up');

})