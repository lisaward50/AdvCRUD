const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const Post           = require("./models/post");
const seedDatabase  = require("./seed");
const PORT           = process.env.PORT || 3000;
const url            = "mongodb://localhost:27017/elevate"

mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDatabase();

app.get("/", function(req, res){
  res.render("home");
});

//INDEX ROUTE
app.get("/posts", function(req, res){
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    } else {
      res.render("index", {posts: allPosts});
    }
  });
});

app.listen(PORT, function(){
  console.log("Server up and running");
});
