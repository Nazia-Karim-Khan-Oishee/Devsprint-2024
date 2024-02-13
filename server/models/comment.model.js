const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commented_by: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
