const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  datetime: String,
  location: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
