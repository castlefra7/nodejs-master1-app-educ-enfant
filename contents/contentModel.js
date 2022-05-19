const mongoose = require('mongoose');
const {Schema} = mongoose;

const contentSchema = new Schema({
    createdDate: {type:Date, default: new Date()},
    text: {type: String},
    images: [{type: String}],
    videos: [{type: String}]
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;