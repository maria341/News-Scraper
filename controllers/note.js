var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

var express = require("express");
var app = express();

var mongoose = require("mongoose");

module.exports = function(app) {

    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id })

        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote_id }, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post("/notes", function(req,res) {
        db.Note.find({})
        .then(function(dbNote) {
            res.json(dbNote);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/notes/:id", function(req,res) {
        if(req.params.id) {
            db.Notes.find({
                "article": req.params.id
            })
            .exec(function(error, doc) {
                if(err) {
                    console.log(err)
                } else {
                    res.send(doc);
                }
            });
        }
    });

    app.delete("/notes/:id", function(req, res) {
        db.Note.deleteOne({ _id: req.params.id }, function(err, data) {
            if(err) {
                console.log(err);
            }
            else {
                res.json(data);
            }
        });
    });
}