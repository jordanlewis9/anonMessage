const Board = require("./../models/boardModel");
const Thread = require("./../models/threadModel");

// No route defined to create a board
exports.createBoard = async (req, res) => {
  const newBoard = await Board.create({ name: req.body.name });
  res.status(200).json({
    status: "success",
    newBoard,
  });
};

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ name: req.params.board }).populate({
      path: "threads",
    });
    if (!board) {
      console.log("no board");
      return res.status(400).json({
        status: "fail",
        board: null,
        message: "Board could not be found.",
      });
    }
    res.status(200).json({
      status: "success",
      board,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      board: null,
      message: "Board could not be found.",
    });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    if (!boards) {
      return res.status(400).json({
        status: "fail",
        message: "Boards could not be obtained.",
      });
    }
    res.status(200).json({
      status: "success",
      boards,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Boards could not be obtained.",
    });
  }
};
