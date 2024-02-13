const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  members: [
    {
      type: String,
      required: true,
    },
  ],
  messages: [
    {
      type: String,
      required: true,
    },
  ],
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
