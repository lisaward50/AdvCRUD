const Post = require("../models/post");

const middlewareObj = {};

middlewareObj.log = function(req, res, next){
  console.log("ok");
  next();
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

module.exports = middlewareObj;
