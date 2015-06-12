var express = require('express'),
    app = express();

var morgan = require('morgan');
app.use(morgan('tiny'));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.render("toberemoved");
});

app.listen(3000, function() {
  console.log("You started the serever on port 3000, well done!");
});
