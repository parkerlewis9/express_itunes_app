var mongoose = require("mongoose");
var scoreSchema = mongoose.Schema({
					name: String,
					highScore: Number
});
var Score = mongoose.model("Score", scoreSchema);
module.exports = Score;