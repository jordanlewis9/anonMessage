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

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("API ROUTING FOR /api/threads/:board", function () {
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

    suite("DELETE", function () {
      test("Delete a thread", async function () {
        const testThread = await Thread.create({
          name: "Test Delete Thread",
          board: "Cincinnati Bengals",
          text: "Testing Delete",
          delete_password: "ABC",
          board_id: "5ed83f1a0e878f45506301ba",
        });
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
          });
      });
    });

    suite("PUT", function () {});
  });

  suite("API ROUTING FOR /api/replies/:board", function () {
    suite("POST", function () {});

    suite("GET", function () {});

    suite("PUT", function () {});

    suite("DELETE", function () {});
  });
});
