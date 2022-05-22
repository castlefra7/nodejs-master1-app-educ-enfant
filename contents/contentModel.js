const mongoose = require('mongoose');
const {Schema} = mongoose;

const contentSchema = new Schema({
    createdDate: {type:Date, default: new Date()},
    title: {type: String, required: true},
    text: {type: String, required: true},
    images: [{type: String, required: false}],
    video: {type: String, required: false}
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;