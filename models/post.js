const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,   //reference to user's schema 
        ref: 'User'
    }
},{
    //timestamps created at updated at
    timestamps: true,
}

);

const Post = mongoose.model('Post',postSchema);

module.exports = Post;