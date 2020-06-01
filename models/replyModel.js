const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  thread_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Thread",
    required: [true, "A reply must be linked to a thread"],
  },
  text: {
    type: String,
    required: [true, "A reply must contain text"],
  },
  delete_password: {
    type: String,
    required: [true, "A reply must contain a password to delete it"],
    select: false,
  },
  created_on: Date,
  reported: {
    type: Boolean,
    default: false,
  },
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
