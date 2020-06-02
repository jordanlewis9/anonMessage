const Thread = require("./../models/threadModel");

exports.createThread = async (req, res) => {
  try {
    req.body.board = req.params.board;
    const isNewThread = await Thread.findOne({ board: req.body.board });
    if (isNewThread) {
      return res.status(400).json({
        status: "fail",
        message:
          "There is already a board with that name. Please create a new board and try again.",
      });
    }
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
    const thread = await (
      await Thread.findOne({ board: req.params.board })
    ).populate({ path: "replies" });
    console.log(thread.replies);
    res.status(200).json({
      status: "success",
      thread,
    });
  } catch (err) {
    console.log(err);
  }
};
