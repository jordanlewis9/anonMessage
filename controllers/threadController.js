const Thread = require("./../models/threadModel");
const Board = require("./../models/boardModel");

exports.createThread = async (req, res) => {
  try {
    console.log(req.params.board);
    req.body.board = req.params.board;
    console.log(req.body.board);
    const board = await Board.findOne({ name: req.body.board }).populate({
      path: "threads",
    });
    if (!board) {
      return res.status(400).json({
        status: "fail",
        message: "There is no board with that name. Please try again.",
      });
    }
    // look into board having same named threads
    req.body.board_id = board._id;
    const newThread = await Thread.create(req.body);
    res.status(200).json({
      status: "success",
      newThread,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await Thread.findOne({ board: req.params.board }).populate({
      path: "replies",
      sort: { created_on: 1 },
    });
    console.log(thread.replies);
    res.status(200).json({
      status: "success",
      thread,
    });
  } catch (err) {
    console.log(err);
  }
};
