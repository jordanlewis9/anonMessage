const Reply = require("./../models/replyModel");
const Thread = require("./../models/threadModel");

exports.createReply = async (req, res) => {
  try {
    const thread = await Thread.findByIdAndUpdate(req.body.thread_id, {
      bumped_on: Date.now(),
    });
    if (!thread) {
      return res.status(400).json({
        status: "fail",
        message:
          "There is no thread associated with that id. Please try again!",
      });
    }
    const newReply = await Reply.create(req.body);
    res.status(200).json({
      status: "success",
      newReply,
    });
  } catch (err) {
    console.log(err);
  }
};
