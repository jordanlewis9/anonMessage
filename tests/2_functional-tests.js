/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");
var Thread = require("../models/threadModel");
var Reply = require("../models/replyModel");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("API ROUTING FOR /api/threads/:board", async function () {
    suite("POST", function () {
      test("Posting a new thread", function (done) {
        chai
          .request(server)
          .post("/api/threads/Cleveland%20Browns")
          .send({
            text: "Testing thread",
            delete_password: "ABC",
            name: "Functional Test",
          })
          .end(async function (err, res) {
            assert.equal(res.status, 201, "Status is equal");
            assert.equal(
              res.body.newThread.text,
              "Testing thread",
              "Text is equal"
            );
            assert.isDefined(
              res.body.newThread.delete_password,
              "Password exists"
            );
            assert.equal(
              res.body.newThread.created_on,
              res.body.newThread.bumped_on,
              "Times are equal"
            );
            assert.isDefined(res.body.newThread._id, "ID exists");
            assert.equal(
              res.body.newThread.reported,
              false,
              "Reported is false"
            );
            const deleteThread = await Thread.deleteOne({
              name: "Functional Test",
            });
            done();
          });
      });
    });

    suite("GET", function () {
      test("Get 10 most recently bumped threads", function (done) {
        chai
          .request(server)
          .get("/api/threads/Cleveland%20Browns")
          .end(function (err, res) {
            assert.equal(res.body.status, "success", "Request was a success");
            assert.isArray(res.body.threads, "Threads is an array");
            assert.equal(
              res.body.threads.length,
              10,
              "Threads array has 10 elements in it"
            );
            assert.equal(
              res.body.threads[0].replies.length,
              3,
              "A thread with 4 replies only shows the 3 most recent"
            );
            assert.isUndefined(
              res.body.threads[0].reported,
              "Reported field does not exist"
            );
            assert.isUndefined(
              res.body.threads[0].delete_password,
              "Delete password does not exist"
            );
            done();
          });
      });
    });

    const testThread = await Thread.create({
      name: "Test Delete Thread",
      board: "Cincinnati Bengals",
      text: "Testing Delete",
      delete_password: "ABC",
      board_id: "5ed83f1a0e878f45506301ba",
    });

    suite("PUT", function () {
      test("Report a thread", function (done) {
        chai
          .request(server)
          .put("/api/threads/Cincinnati%20Bengals")
          .send({
            thread_id: testThread.id,
          })
          .end(function (err, res) {
            assert.equal(
              res.body.status,
              "success",
              "Thread was successfully reported"
            );
            done();
          });
      });
    });

    suite("DELETE", function () {
      test("Delete a thread", function (done) {
        chai
          .request(server)
          .delete("/api/threads/Cincinnati%20Bengals")
          .send({
            thread_id: testThread.id,
            delete_password: "ABC",
          })
          .end(function (err, res) {
            assert.equal(
              res.body.status,
              "success",
              "Thread was successfully deleted"
            );
            done();
          });
      });
    });
  });

  suite("API ROUTING FOR /api/replies/:board", async function () {
    suite("POST", function () {
      test("Posting a reply", function (done) {
        chai
          .request(server)
          .post("/api/replies/Cincinnati%20Bengals")
          .send({
            text: "Testing posting of reply",
            delete_password: "ABC",
            thread_id: "5f2ca85c49d6c23cf87fca3a",
          })
          .end(function (err, res) {
            assert.equal(
              res.body.status,
              "success",
              "Reply was successfully posted."
            );
            assert.isDefined(res.body.newReply._id, "ID exists");
            assert.equal(
              res.body.newReply.text,
              "Testing posting of reply",
              "Text was successfully saved."
            );
            assert.isDefined(
              res.body.newReply.created_on,
              "Created on exists for reply"
            );
            assert.isDefined(
              res.body.newReply.delete_password,
              "Delete password is saved"
            );
            assert.equal(
              res.body.newReply.reported,
              false,
              "Reported is saved as false"
            );
            done();
          });
      });
    });

    suite("GET", function () {
      test("Get a single thread with all of it's replies", function (done) {
        chai
          .request(server)
          .get(
            "/api/replies/Cleveland%20Browns?thread_id=5f14e97bf8753117e480f87e"
          )
          .end(function (err, res) {
            assert.equal(
              res.body.status,
              "success",
              "Single thread successfully received"
            );
            assert.equal(
              res.body.thread.name,
              "Baker Mayfield",
              "Correct name shown"
            );
            assert.equal(
              res.body.thread.board,
              "Cleveland Browns",
              "Thread is filed under correct board"
            );
            assert.isArray(res.body.thread.replies, "Replies is an array");
            assert.isUndefined(
              res.body.thread.replies[0].reported,
              "Reported is hidden for replies"
            );
            assert.isUndefined(
              res.body.thread.replies[0].delete_password,
              "Delete password is hidden from replies"
            );
            done();
          });
      });
    });

    const testReply = await Reply.create({
      text: "Test reply for PUT and DELETE",
      delete_password: "ABC",
      thread_id: "5f2ca85c49d6c23cf87fca3a",
    });

    suite("PUT", function () {
      test("Reporting a reply", function (done) {
        chai
          .request(server)
          .put("/api/replies/Cincinnati%20Bengals")
          .send({ thread_id: testReply.thread_id, reply_id: testReply._id })
          .end(function (err, res) {
            assert.equal(res.body.status, "success");
            done();
          });
      });
    });

    suite("DELETE", function () {
      test("Deleting a thread by replacing text with [deleted]", function (done) {
        chai
          .request(server)
          .delete("/api/replies/Cincinnati%20Bengals")
          .send({
            thread_id: "5f2ca85c49d6c23cf87fca3a",
            reply_id: testReply._id,
            delete_password: "ABC",
          })
          .end(function (err, res) {
            assert.equal(res.body.status, "success");
            done();
          });
      });
    });
  });
});
