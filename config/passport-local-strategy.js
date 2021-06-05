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

module.exports = passport;