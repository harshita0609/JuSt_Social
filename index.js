const express = require('express');
// cookie parser
const cookieParser = require('cookie-parser');

const port = 8002;
const app = express();

// mongoose
const db = require('./config/mongoose');

// express session for cookies in passport js
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');

// permanent cookie session
const MongoStore = require('connect-mongo')(session);

// sass middleware

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:'extended',
    prefix:'/css'
}));

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



// view template
app.set('view engine','ejs');
app.set('views','./views');

// passport middleware  --> shifted router middle ware after this

app.use(session({

        name: 'JuSt_Social',
        secret:'abcdefgh',
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge: (1000*60*60)
        },
        store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log( err || 'connected session with mongo db');
        }
        )
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware for views locals sign in 
app.use(passport.setAuthenticatedUser)

// router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error in setting server');
        return;
    }
    console.log('server is up');

})