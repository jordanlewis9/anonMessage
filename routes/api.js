/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
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

  // app.route("/api/board").post(boardController.createBoard);

  app.route("/api/:board").get(boardController.getBoard);
};
