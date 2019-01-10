const express  = require("express");
const router   = express.Router();
const passport = require("passport");
const User     = require("../models/user");

router.get("/", function(req, res){
  res.render("home");
});

//SHOW REGISTRATION FORM
router.get("/register", function(req, res){
  res.render("auth/register");
});

//HANDLE SIGN UP FUNCTIONALITY / LOGIC
router.post("/register", function(req, res){
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/posts");
    });
  });
});

module.exports = router;
