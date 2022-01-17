const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
import { Error } from "mongoose";
require("dotenv").config();
import { shortenURL, redirectURL } from "./controllers";
import { Request, Response } from "express";

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
  .use(bodyparser.urlencoded({ extended: true }))
  .set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("home", { data: "" });
});
app.post("/url", shortenURL, (req: Request, res: Response) => {
  res.render("home", { data: res.locals.data.url });
});
app.get("/shorty/:ind", redirectURL);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("listening on port: " + port);
});
