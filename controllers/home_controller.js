module.exports.home = function(req,res){
    // return res.end('<h1>Hello this is a html content</h1>')

    return res.render('home.ejs',{
        title: "HOME"
    });
};