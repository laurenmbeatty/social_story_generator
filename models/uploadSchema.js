/**
 * Created by Lauren on 10/27/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = mongoose.Schema ({
    name: String,
    created: Date,
    file: Object
});

module.exports = mongoose.model('Upload', uploadSchema);