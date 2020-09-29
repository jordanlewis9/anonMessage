const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");

const apiRoutes = require("./routes/api.js");

dotenv.config({ path: "./.env" });

const app = express();

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

//Start our server and tests!
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.clear();
    console.log("DB Connected! ===============================");
    app.listen(process.env.PORT || 5000, function () {
      console.log("Listening on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

module.exports = app; //for testing
