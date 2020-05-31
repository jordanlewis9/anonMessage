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

module.exports = function (app) {
  app.route("/api/threads/:board").post(threadController.createThread);

  app.route("/api/replies/:board");
};
