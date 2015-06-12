var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/itunes_app");
module.exports.Score = require("./score")