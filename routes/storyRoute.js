var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var story = require('../models/storyModel.js');


/////////////////////////////////
//   Gets story from database  //
/////////////////////////////////

router.get('/:story_number?', function (request, response, next) {

    var id = request.params.id;

    if (id) {
        story.findOne({id: id}, function (err, story) {
            response.json(story);
        });
    } else {
        story.find({}, function (err, story) {
            if (err) {
                console.log("get request", err);
            }
            response.json(story);
        });
    }
});

////////////////////////////////
// add new story to database  //
////////////////////////////////

router.post('/add', function (request, response, next) {
    var newStory = new story();
    console.log(request.body);
    console.log(newStory);

    for(var i=0; i < request.body.text.length; i++) {
        //created a new empty scenes object
        var pushObject = {};
        //push each individual index into an object
        pushObject.text = request.body.text[i];
        pushObject.imageUrl = request.body.imageUrl[i];
        //push each object into the empty object
        newStory.scenes.push(pushObject);
    }
    newStory.save(function (err) {
        if (err) {
            console.log("Post error", err);
            response.send("Cannot post data");
        }
        console.log("SAVED!", newStory);
        response.send(200);
    });
});

////////////////////////////////////
//  This will delete a story     //
///////////////////////////////////

router.delete('/remove/:id', function (request, response) {
    var id = request.params.id;
    story.findOne({id: id}, function (err, story) {
        if (err) {
            console.log("deleting error");
            next(err);
        } else {
            story.remove(function (err) {
                if (err) throw err;
            });
        }
    });
});
//This handles saving an uploaded image
//router.post('/image', multiparty, function(req, res){
//
//    //Check to see if our directory exists
//    try {
//        fs.mkdirSync(path.join(__dirname, "../public/images/uploads/"));
//    } catch(e) {
//        if (e.code != 'EEXIST') {
//            res.send(e);
//            console.log("ERROR!" + e);
//            return;
//        }
//    }
//    var file = req.files.file;
//    var inputSource = fs.createReadStream(file.path);
//    var outputSource = fs.createWriteStream(path.join(__dirname, "../public/images/uploads/", file.name));
//    inputSource.pipe(outputSource);
//
//    outputSource.on('error', function(err) {
//        if(err) {
//            console.log(err);
//        }
//        res.send(err);
//    });
//    inputSource.on('end', function() {
//        fs.unlink(file.path, function(err) {
//            if(err) {
//                console.log(err);
//            }
//        });
//        res.send("images/uploads/" + file.name);
//    });
//});


module.exports = router;