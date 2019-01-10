const Post = require("../models/post");

const middlewareObj = {};

middlewareObj.log = function(req, res, next){
  console.log("ok");
  next();
};

middlewareObj.checkPostOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Post.findById(req.params.id, function(err, foundPost){
      if(err){
        req.flash("error", "Post not found");
        res.redirect("back");
      } else {
        if(foundPost.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

module.exports = middlewareObj;
