const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

// using middleware
passport.use(new LocalStrategy({

                  usernameField:'email'   },
                  function(email,password,done){

                    User.findOne({email:email}, function(err,user){

                        if(err){
                            console.log("error in finding user");
                            return done(err);
                        }
                        if(!user || user.password!=password){
                            console.log("error in username/password");
                            return done(null,false);
                        }

                        return done(null,user);
                    });



                  }

));

// serializing
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in desrialising user");
            return done(err);
        }
        return done(null,user);
    });
});


// to send data to views and to authenticate user so that profile page can be accessed 

passport.checkAuthentication = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
};

module.exports = passport;