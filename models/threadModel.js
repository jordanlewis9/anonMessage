const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
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
    created_on: {
      type: Date,
      default: Date.now(),
    },
    bumped_on: {
      type: Date,
      default: Date.now(),
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

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
