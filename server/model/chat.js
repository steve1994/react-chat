var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    name : String,
    chat : String
})

module.exports = mongoose.model('Chat',chatSchema);
