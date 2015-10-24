var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new mongoose.Schema({
    scenes: [
        {
            text: String,
            imageUrl: String
        }
    ]
});

var story = mongoose.model('story', storySchema);

module.exports = story;