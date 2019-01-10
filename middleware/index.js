const Post = require("../models/post");

const middlewareObj = {};

middlewareObj.log = function(req, res, next){
  console.log("ok");
  next();
};

module.exports = middlewareObj;
