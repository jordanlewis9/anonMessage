const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    minlength: [3, "A password must contain at least 3 characters."],
    maxlength: [8, "A password must contain 8 or fewer characters."],
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  reported: {
    type: Boolean,
    default: false,
  },
});

replySchema.pre("save", async function (next) {
  const saltRounds = 12;
  this.delete_password = await bcrypt.hash(this.delete_password, saltRounds);
  next();
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
