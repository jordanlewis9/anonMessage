const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Thread = require("./models/threadModel");
const Reply = require("./models/replyModel");

dotenv.config({ path: "./.env" });

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.clear();
    console.log("DB Connected!");
    try {
      await Thread.deleteMany();
      await Reply.deleteMany();
      console.log("Data successfully deleted");
      process.exit();
    } catch (err) {
      console.log(err);
    }
  });
