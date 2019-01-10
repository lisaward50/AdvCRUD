const express    = require("express");
const router     = express.Router({mergeParams: true});
const Post       = require("../models/post");
const Comment    = require("../models/comment");
const middleware = require("../middleware");

//COMMENT NEW ROUTE
router.get("/new", middleware.log, function(req, res){
  Post.findById(req.params.id, function(err, post){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {post: post});
    }
  });
});

//B COMMENT CREATE ROUTE
router.post("/", middleware.log, function(req, res){
  Post.findById(req.params.id, function(err, post){
    if(err){
      console.log(err);
      res.redirect("/posts");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          comment.save();
          post.comments.push(comment);
          post.save();
          console.log(comment);
          res.redirect("/posts/" + post._id);
        }
      });
    }
  });
});

module.exports = router;
