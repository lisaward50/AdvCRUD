const express    = require("express");
const router     = express.Router();
const Post       = require("../models/post");
const middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res){
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    } else {
      res.render("posts/index", {posts: allPosts});
    }
  });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("posts/new");
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
  const title       = req.body.title;
  const datetime    = req.body.datetime;
  const location    = req.body.location;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newPost = {title: title, datetime: datetime, location: location, description: description, author: author};
  Post.create(newPost, function(err, newlyCreatedPost){
    if(err){
      res.render("posts/new");
    } else {
      res.redirect("/posts");
    }
  });
});

//SHOW ROUTE
router.get("/:id", function(req, res){
  Post.findById(req.params.id).populate("comments").exec(function(err, chosenPost){
    if(err){
      res.redirect("/posts");
    } else {
      res.render("posts/show", {post: chosenPost});
    }
  });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.log, function(req, res) {
  Post.findById(req.params.id, function(err, chosenPost){
    //
    if(err){
      res.redirect("/posts");
    } else {
      res.render("posts/edit", {post: chosenPost});
    }
  })
});

//UPDATE ROUTE
router.put("/:id", middleware.log, function(req, res){
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
    if(err){
      res.redirect("/posts");
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//DESTROY ROUTE
router.delete("/:id", middleware.log, function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/posts");
    } else {
      res.redirect("/posts");
    }
  });
});

module.exports = router;
