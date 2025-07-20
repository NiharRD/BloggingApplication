const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Post schema with reference
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
