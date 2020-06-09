const Thread = require("./../models/threadModel");
const Board = require("./../models/boardModel");

exports.createThread = async (req, res) => {
  try {
    req.body.board = req.params.board;
    const board = await Board.findOne({ name: req.body.board }).populate({
      path: "threads",
    });
    if (!board) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect board given.",
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
    const thread = await Thread.findById(req.query.thread_id)
      .select("-reported")
      .populate({
        path: "replies",
        sort: { created_on: 1 },
      });
    if (!thread) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect thread id given.",
      });
    } else if (req.params.board !== thread.board) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect board given.",
      });
    }
    res.status(200).json({
      status: "success",
      thread,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({ board: req.params.board })
      .sort({ bumped_on: -1 })
      .limit(10)
      .select("-reported")
      .populate({
        path: "replies",
        options: {
          sort: { created_on: -1 },
          limit: 3,
          select: "-reported",
        },
      });
    res.status(200).json({
      status: "success",
      threads,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const threadToDelete = await Thread.findById(req.body.thread_id).select(
      "delete_password"
    );
    if (req.body.delete_password !== threadToDelete.delete_password) {
      return res.status(400).json({
        status: "fail",
        message: "incorrect password",
      });
    }
    await Thread.findByIdAndDelete(req.body.thread_id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.reportThread = async (req, res) => {
  try {
    const isCorrectThread = await Thread.findById(req.body.thread_id);
    if (!isCorrectThread) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect thread id given.",
      });
    } else if (req.params.board !== isCorrectThread.board) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect board given.",
      });
    }
    await Thread.findByIdAndUpdate(req.body.thread_id, { reported: true });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
