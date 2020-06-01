const Thread = require("./../models/threadModel");

exports.createThread = async (req, res) => {
  try {
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
    const thread = await Thread.findById(req.body.thread_id).populate({
      path: "replies",
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
