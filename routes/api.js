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

module.exports = function (app) {
  app
    .route("/api/threads/:board")
    .get(threadController.getThread)
    .post(threadController.createThread);

  app.route("/api/replies/:board").post(replyController.createReply);
};
