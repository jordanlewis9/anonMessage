const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A board must have a name."],
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
