const express = require("express");
const mongoose = require("mongoose");
import { Error } from "mongoose";
require("dotenv").config();
import responseHandler from "./response";

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

const app = express();
app.get("/", responseHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("listening on port: " + port);
});
