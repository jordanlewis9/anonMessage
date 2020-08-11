const Board = require("./../models/boardModel");
const Thread = require("./../models/threadModel");

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
    // const threads = await Thread.find()
    //   .sort({ bumped_on: -1 })
    //   .limit(10)
    //   .populate({ path: "replies" });
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
    console.log("catch");
    console.log(err);
    return res.status(400).json({
      status: "fail",
      board: null,
      message: "Board could not be found.",
    });
  }
};

exports.getBoards = async (req, res) => {
  const boards = await Board.find();
  res.status(200).json({
    status: "success",
    boards,
  });
};
