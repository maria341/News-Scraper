var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

var express = require("express");
var app = express();

var mongoose = require("mongoose");

module.exports = function(app) {

    app.get("/", function(req, res) {
        db.Article.find({ saved: false }, function(err, result) {
            if(err) {
                console.log("Error findings unsaved articles: " + err);
            }
            else {
                res.render("index", {
                    articles: result
                });
            }
        });
    });

    app.put("/savedarticles/:id", function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
        .then(function(result) {
            console.log("Saved article is working");
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
            console.log("Error in finding saved articles: " + err);
        });
    });

    app.put("/unsavedarticles/:id", function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .then(function(result) {
            console.log("This unsaved article is working");
            res.json(result);
        })
        .catch(function(err) {
            res.json(err);
            console.log("Error in finding saved articles: " + err);
        });
    });

    app.get("/saved", function(req, res) {
        db.Article.find({ saved: true }, function(err, result) {
            if(err) {
                console.log("Error in saving articles: " + err);
            }
            else {
                res.render("saved", {
                    articles: result,
                });
            }
        });
    });

    app.delete("/deletearticles/:id", function(req, res) {
        db.Article.findOneAndRemove({ _id: req.params.id })
        .then(function(result) {
            console.log("This is successfully deleted");
        })
        .catch(function(err) {
            res.json(err);
            console.log("Error in finding saved articles: " + err);
        });
    });

    app.post('/', function(req, res) {
        res.json(data);
    });
}