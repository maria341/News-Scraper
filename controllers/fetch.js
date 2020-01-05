var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

var express = require("express");
var app = express();

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.foxnews.com/local/").then(function(response) {
            var $ = cheerio.load(response.data);

            $("div.tease-container-right").each(function(i, element) {
                var result = {};

                result.title = $(this).find("a.tease-headline").text().trim();
                result.link = $(this).find("a.tease-headline").attr("href");
                result.summary = $(this).find("div.tease-summary").text().trim();
                result.image = $(this).find("a.tease-headline").find("div.tease-photo-img").find("img").attr("src");
            
            console.log(result);

            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
               console.log("You have error in fetch.js file " + err);
               return res.json(err);
            });
            });

            res.send("Scrape successfully");
        });
    });
}