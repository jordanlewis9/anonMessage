const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A board must have a name."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

boardSchema.virtual("threads", {
  ref: "Thread",
  foreignField: "board_id",
  localField: "_id",
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
