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

//TODO
//Would this work????????? Create two separate schemas, one that defines a scene, and then include
//the scene in the storySchema
//var sceneSchema = new mongoose.Schema({
//    text: String,
//    imageUrl: String
//});
//
//var storySchema = new mongoose.Schema ({
//    _id: ObjectId,
//    scenes: [sceneSchema]
//});




var story = mongoose.model('story', storySchema);

module.exports = story;