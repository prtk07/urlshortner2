const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
import { Error } from "mongoose";
require("dotenv").config();
import responseHandler from "./response";
import { shortenURL } from "./controllers";

function mongooseConnection() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected");
    })
    .catch((e: Error) => {
      console.log("Error at:  " + e);
      mongooseConnection();
    });
}
mongooseConnection();

const app = express()
  .use(bodyparser.json())
  .use(bodyparser.urlencoded({ extended: true }));

app.get("/", responseHandler);
app.post("/url", shortenURL, responseHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("listening on port: " + port);
});
