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
            assert.equal(res.status, 201);
            assert.equal(res.body.newThread.text, "Testing thread");
            assert.isDefined(res.body.newThread.delete_password);
            assert.equal(
              res.body.newThread.created_on,
              res.body.newThread.bumped_on
            );
            assert.isDefined(res.body.newThread._id);
            assert.equal(res.body.newThread.reported, false);
            assert.isArray(res.body.newThread.replies);
            const deleteThread = await Thread.deleteOne({
              name: "Testing thread",
            });
            done();
          });
      });
    });

    suite("GET", function () {});

    suite("DELETE", function () {});

    suite("PUT", function () {});
  });

  suite("API ROUTING FOR /api/replies/:board", function () {
    suite("POST", function () {});

    suite("GET", function () {});

    suite("PUT", function () {});

    suite("DELETE", function () {});
  });
});
