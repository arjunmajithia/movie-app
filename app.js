var express = require("express");
var request = require("request");

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    var movie = req.query.movie;
    var url = "http://www.omdbapi.com/?s=" + movie + "&apikey=thewdb"
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200)
        {
            var data = JSON.parse(body);
            res.render("searchPage", {data: data});
        }
    });
});

app.get("*", function(req, res){
    res.send("The URL that you are looking for does not exist");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie app started");
});