const express = require('express');
const port = 8002;
const app = express();

// mongoose
const db = require('./config/mongoose');

// cookie parser
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());

// layouts
const expressLayout = require('express-ejs-layouts')
app.use(expressLayout);

// static files assets
app.use(express.static('./assets'));

// allow diff  css, scripts for individual pages and add them in layout correct place
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

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