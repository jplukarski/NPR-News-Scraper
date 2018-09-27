var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 3000;
var app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/week18Populater", { useNewUrlParser: true });


//set up routes here
app.get("/scrape", function (req, res) {

})

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});