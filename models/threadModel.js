const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  board: {
    type: String,
    required: [true, "A thread must belong to a board"],
  },
  text: {
    type: String,
    required: [true, "A thread must have text associated with it"],
  },
  delete_password: {
    type: String,
    required: [true, "A thread must have a password to delete it"],
    hidden: true,
  },
  reported: Boolean,
  replies: [Number],
  created_on: Date,
  bumped_on: Date,
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
