const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A thread must belong to a board"],
    },
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
      select: false,
    },
    reported: {
      type: Boolean,
      default: false,
    },
    created_on: Date,
    bumped_on: Date,
    board_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Board",
      required: [true, "A thread must belong to a board."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

threadSchema.virtual("replies", {
  ref: "Reply",
  foreignField: "thread_id",
  localField: "_id",
});

threadSchema.pre("save", async function (next) {
  const saltRounds = 12;
  this.delete_password = await bcrypt.hash(this.delete_password, saltRounds);
  next();
});

threadSchema.pre("save", function (next) {
  const now = Date.now();
  this.created_on = now;
  this.bumped_on = now;
  next();
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
