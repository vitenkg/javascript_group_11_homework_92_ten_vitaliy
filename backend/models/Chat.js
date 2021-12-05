const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datetime: {
    type: String,
    required: true,
  },
});

ChatSchema.plugin(idValidator);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;