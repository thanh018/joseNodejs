var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
    info: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;