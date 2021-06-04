const User = require("../models/user");

// console.log(User);

module.exports.profile = function(req,res){
    // return res.end('<h1>USER controller -> profile</h1>');


    if(req.cookies.user_id){

        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: "User profile",
                    user: user
                })

            }
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }

    // return res.render('user_profile.ejs',{
    //     title: "Profile",
    //     // email: User.email,
    //     // name: User.name
    // });


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

    // find user
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log('error is finding user');
            return;
        }
// handle user found
        if(user){
            // pass not matched
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');




        }
// handle user not found
        else{
            return res.redirect('back');

        }


    });
    
};