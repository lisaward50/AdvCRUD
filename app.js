const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const PORT           = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/posts", function(req, res){
  res.render("index");
});

app.listen(PORT, function(){
  console.log("Server up and running");
});
