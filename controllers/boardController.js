const Board = require("./../models/boardModel");

exports.createBoard = async (req, res) => {
  const newBoard = await Board.create({ name: req.body.name });
  res.status(200).json({
    status: "success",
    newBoard,
  });
};

exports.getBoard = async (req, res) => {
  const board = await Board.findOne({ name: req.params.board }).populate({
    path: "threads",
  });
  res.status(200).json({
    status: "success",
    board,
  });
};
