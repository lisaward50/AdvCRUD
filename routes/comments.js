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

//COMMENT CREATE ROUTE
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

//COMMENT EDIT ROUTE - show edit comment form
router.get("/:comment_id/edit", middleware.log, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
    }
  });
});

//COMMENT UPDATE ROUTE - update specific comment
router.put("/:comment_id", middleware.log, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  })
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.log, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  })
});

module.exports = router;
