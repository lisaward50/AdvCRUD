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
router.get("/new", middleware.log, function(req, res){
  res.render("posts/new");
});

//CREATE ROUTE
router.post("/", middleware.log, function(req, res){
  Post.create(req.body.post, function(err, newPost){
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
