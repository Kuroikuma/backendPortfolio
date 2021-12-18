const mongoose = require("mongoose");
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cpnkf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("data connected");
  })
  .catch((err) => {
    console.error(err);
  });

exports.module = mongoose;
