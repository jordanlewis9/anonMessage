const bcrypt = require("bcrypt");
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
        message: "Incorrect thread id given.",
      });
    }
    const newReply = await Reply.create(req.body);
    res.status(201).json({
      status: "success",
      newReply,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const { reply_id, thread_id, delete_password } = req.body;
    const replyToDelete = await Reply.findById(reply_id).select(
      "+delete_password"
    );
    console.log(reply_id);
    const match = await bcrypt.compare(
      delete_password,
      replyToDelete.delete_password
    );
    if (!replyToDelete) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect reply id",
      });
    } else if (String(thread_id) !== String(replyToDelete.thread_id)) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect thread id given.",
      });
    } else if (!match) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect password given.",
      });
    }
    await Reply.findByIdAndUpdate(reply_id, { text: "[deleted]" });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.reportReply = async (req, res) => {
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
        message: "Incorrect board sent.",
      });
    }
    const reportedReply = await Reply.findByIdAndUpdate(req.body.reply_id, {
      reported: true,
    });
    if (!reportedReply) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect reply id given.",
      });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
