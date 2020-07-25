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
    suite("POST", async function () {
      test("Posting a new thread", function (done) {
        chai
          .request(server)
          .post("/api/threads/Cleveland%20Browns")
          .send({
            text: "Testing thread",
            delete_password: "ABC",
            name: "Functional Test",
          })
          .end(function (err, res) {
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
            done();
          });
      });
      const deleteThread = await Thread.deleteOne({
        name: "Functional Test",
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
