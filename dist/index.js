"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
require("dotenv").config();
var controllers_1 = require("./controllers");
function mongooseConnection() {
    mongoose
        .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(function () {
        console.log("Connected");
    })
        .catch(function (e) {
        console.log("Error at:  " + e);
        mongooseConnection();
    });
}
mongooseConnection();
var app = express()
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({ extended: true }))
    .set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("home", { data: "" });
});
app.post("/url", controllers_1.shortenURL, function (req, res) {
    res.render("home", { data: res.locals.data.url });
});
app.get("/shorty/:ind", controllers_1.redirectURL);
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("listening on port: " + port);
});
