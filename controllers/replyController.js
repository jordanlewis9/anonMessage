const Reply = require("./../models/replyModel");

exports.createReply = async (req, res) => {
  try {
    const newReply = await Reply.create(req.body);
    res.status(200).json({
      status: "success",
      newReply,
    });
  } catch (err) {
    console.log(err);
  }
};
