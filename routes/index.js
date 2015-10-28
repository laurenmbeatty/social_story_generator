var express = require('express');
var passport = require('passport');
var path = require('path');
var router = express.Router();
var Upload = require('../models/uploadSchema');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/users/home',
    failureRedirect: '/'
}));

router.get('/', function (request, response, next) {
    Upload.find({}, function (err, uploads) {
        if (err) {
            next(err);
        } else {
            response.render('index', {uploads: uploads});
        }
    });
});

module.exports = router;
