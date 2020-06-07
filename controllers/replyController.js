const Reply = require("./../models/replyModel");
const Thread = require("./../models/threadModel");

exports.createReply = async (req, res) => {
  try {
    req.body.created_on = Date.now();
    const thread = await Thread.findByIdAndUpdate(req.body.thread_id, {
      bumped_on: req.body.created_on,
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

exports.deleteReply = async (req, res) => {
  try {
    const { _id, thread_id, delete_password } = req.body;
    const replyToDelete = await Reply.findById(_id).select("+delete_password");
    console.log(req.body.thread_id, replyToDelete.thread_id);
    if (!replyToDelete) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect reply id",
      });
    } else if (String(thread_id) !== String(replyToDelete.thread_id)) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect thread id",
      });
    } else if (delete_password !== replyToDelete.delete_password) {
      return res.status(400).json({
        status: "fail",
        message: "incorrect password",
      });
    }
    await Reply.findByIdAndDelete(_id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
