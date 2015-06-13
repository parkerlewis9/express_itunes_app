var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");
	morgan = require("morgan"),
	request = require("request")
	db = require("./models")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));
app.use(express.static(__dirname + '/public'));


var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
                 "982388023", "907242704", "201281527", "656801339", "910038357",
                 "250038575", "878000348",  "794095205",  "1645339",  "400835962",
                 "325618", "191924084",  "376116617",  "169003415",  "51958108",
                 "76532142", "192688540", "684811768", "344799464", "217633921",
                 "192811017", "258404365", "71068886", "640047583", "517438248" ];            

function randomId() {
	var randomNum = Math.floor(Math.random() * songIds.length);
	return randomNum;
}




app.get("/", function(req, res) {
  res.redirect("/scores/new");
});

app.get("/scores", function(req, res) {
	db.Score.find({}, function(err, scores) {
		res.render("scores/index", {scores: scores})		
	})

})

app.get("/scores/new", function(req, res) {
	res.render("scores/new")
})

app.post("/scores", function(req, res) {
	// var score = {};
	// score.name= req.body.score.name;
	// score.highScore= parseInt(req.body.score.score)
	// db.Score.create(score, function(err, scores) {
	// 	res.redirect("/scores")
	// })

	var score = new db.Score({
		name: req.body.score.name,
		highScore: 0
	})
	score.save(function(err, score) {
		res.redirect("/randomsong?id=" + score.id + "&name=" + score.name + "&score=" + score.highScore)
	})



})

app.get("/scores/:id/edit", function(req, res) {
	db.Score.findById(req.params.id, function(err, score) {
		res.render("scores/edit", {score:score})
	})
})

app.put("/scores/:id", function(req, res) {
	if (req.query.nextsong === "true") {
		db.Score.findByIdAndUpdate(req.params.id, req.body.score, function(err, score) {
			console.log(score)
			res.redirect("/randomsong?id=" + req.params.id + "&name=" + req.body.score.name + "&score=" + req.body.score.highScore );
		} )
		// console.log(req.body)
		// res.redirect("/")

	} else {
		var score = {};
		score.name= req.body.score.name;
		score.highScore= parseInt(req.body.score.score)
		db.Score.findByIdAndUpdate(req.params.id, score, function(err, score) {
			res.redirect("/scores");
		} )
	}
})

app.delete("/scores/:id", function(req, res) {
	db.Score.findByIdAndRemove(req.params.id, function(err, score) {
		res.redirect("/scores");
	})
})

app.get("/scores/:id", function(req, res) {
	db.Score.findById(req.params.id, function(err, score) {
		res.render("scores/show", {score: score})
	})
})

app.get("/randomsong", function(req, res) {
	//can use req.query.id to know which player you're using

	var random = randomId();
	var url = "https://itunes.apple.com/lookup?id="
	request.get(url + songIds[random], function(err, response, body) {
		var songData = JSON.parse(body);
		var data = 	songData.results[0];	
		console.log(data.artistName)


		var name = req.query.name;
		var score = req.query.score;
		var id = req.query.id;
		data.name = name;
		data.score = score;
		data.id = id;

		res.render("songPage", {data: data});
	})
})

app.listen(3000, function() {
  console.log("You started the serever on port 3000, well done!");
});










