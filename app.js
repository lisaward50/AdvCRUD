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

//NEW ROUTE
app.get("/posts/new", function(req, res){
  res.render("new");
});

//CREATE ROUTE
app.post("/posts", function(req, res){
  Post.create(req.body.post, function(err, newPost){
    if(err){
      res.render("new");
    } else {
      res.redirect("/posts");
    }
  });
});

//SHOW ROUTE
app.get("/posts/:id", function(req, res){
  Post.findById(req.params.id, function(err, chosenPost){
    if(err){
      res.redirect("/posts");
    } else {
      res.render("show", {post: chosenPost});
    }
  });
});

//EDIT ROUTE
app.get("/posts/:id/edit", function(req, res) {
  Post.findById(req.params.id, function(err, chosenPost){
    //
    if(err){
      res.redirect("/posts");
    } else {
      res.render("edit", {post: chosenPost});
    }
  })
});

//UPDATE ROUTE
app.put("/posts/:id", function(req, res){
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
    if(err){
      res.redirect("/posts");
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//DESTROY ROUTE
app.delete("/posts/:id", function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/posts");
    } else {
      res.redirect("/posts");
    }
  });
});

app.listen(PORT, function(){
  console.log("Server up and running");
});
