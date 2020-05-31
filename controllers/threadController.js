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
