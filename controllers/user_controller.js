module.exports.profile = function(req,res){
    // return res.end('<h1>USER controller -> profile</h1>');

    return res.render('profile.ejs',{
        title: "Profile"
    });
};

