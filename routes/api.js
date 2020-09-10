const threadController = require("./../controllers/threadController");
const replyController = require("./../controllers/replyController");
const boardController = require("./../controllers/boardController");

module.exports = function (app) {
  app
    .route("/api/threads/:board")
    .get(threadController.getThreads)
    .post(threadController.createThread)
    .delete(threadController.deleteThread)
    .put(threadController.reportThread);

  app
    .route("/api/replies/:board")
    .get(threadController.getThread)
    .post(replyController.createReply)
    .delete(replyController.deleteReply)
    .put(replyController.reportReply);

  app.route("/api/boards").get(boardController.getBoards);
  app.route("/api/:board").get(boardController.getBoard);

  // Uncomment to add a board via API
  // app.route("/api/board").post(boardController.createBoard);
};
