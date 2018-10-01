var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();
var path = require('path');
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



//set up routes here

//scrape the npr website
app.get("/scrape", function (req, res) {
    axios.get("https://www.npr.org/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("h3.title").each(function (i, element) {
            var result = {};
            result.title = $(this).text();
            result.link = $(this).parent("a").attr("href")
            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle)
            }).catch(function (err) {
                return res.json(err)
            })
        })
    })
    res.send("Scraping Complete!")
})

//display the articles on the homepage once scraped
app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//unscrape the articles
app.delete("/unscrape", function (req, res) {
    db.Article.deleteMany({}).then(function (dbArticle) {
        res.json(dbArticle)
    }).catch(function (err) {
        res.json(err)
    })
})




//add article to the saved page
app.post("/saveArticle/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }).then(function (dbArticle) {
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err);
        });
})

//remove article from the saved page
app.post("/removeArticle/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }).then(function (dbArticle) {
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err);
        });
})

//Display the notes
app.get("/articles/:id", function (req, res) {
    db.Note.find({ articleID: req.params.id })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//create the notes
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//delete the note
app.delete("/deleteNote/:id", function (req, res) {
    db.Note.deleteOne({ _id: req.params.id }).then(function (dbArticle) {
        res.json(dbArticle)
    }).catch(function (err) {
        res.json(err)
    })
})

app.get("/saved", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/saved.html"));
});



app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});