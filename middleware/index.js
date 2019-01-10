const Post = require("../models/post");

const middlewareObj = {};

middlewareObj.log = function(req, res, next){
  res.send("yes!");
  next();
};

module.exports = middlewareObj;
