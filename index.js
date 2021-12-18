require("dotenv").config();
require("./db/mongoDB.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/", routes());

app.use((error, request, response, next) => {
  console.error(error.name);
  if (error.name === "CastError") {
    response.status(400).send({ error: "id mal formado" });
  } else {
    response.status(500).end();
  }
});

app.use(express.static("uploads"));

app.listen(process.env.APP_PORT, function () {
  console.log(`Server de Portafolio levantado en Port:${process.env.APP_PORT}`);
});
