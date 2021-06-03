module.exports.home = function(req,res){
    // return res.end('<h1>Hello this is a html content</h1>')
    
    
    // console.log(req.cookies); //the cookie in browser is printed
    // res.cookie('user_id',200);  // alter value of cookie created in broswer with i=key as user_id

    return res.render('home.ejs',{
        title: "HOME"
    });
};