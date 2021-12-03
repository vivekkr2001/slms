var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
    name: String,
    link:  String,
    details: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },  
    description: String,
    learning: [String],
    content: [contentSchema]
});

mongoose.model('Course', courseSchema);