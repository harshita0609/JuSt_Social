const User = require("../models/user");

module.exports.profile = function(req,res){
    // return res.end('<h1>USER controller -> profile</h1>');

    return res.render('user_profile.ejs',{
        title: "Profile"
    });
};

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Just_Social|SignUp"
    });
};


module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Just_Social|SignIn"
    });
};

// get sign up data
//sign up page form submit button's action is create 

module.exports.create= function(req,res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back'); //rn just redirecting
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('error in finding user');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){

                if(err){
                    console.log('error in creating user');
                
                }
                return res.redirect('/users/sign-in');
            });

        }
        else{
            return res.redirect('back');
        }
    });


};
// sign in and create session
module.exports.createSession= function(req,res){

    return res.redirect('/');
};