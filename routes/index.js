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
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Elevate " + user.username);
      res.redirect("/posts");
    });
  });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
  res.render("auth/login");
});

//HANDLING LOGIN LOGIC/FUNCTIONALITY
router.post("/login", passport.authenticate("local",
  { successRedirect: "/posts",
    failureRedirect: "/login"
  }), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/posts");
});

module.exports = router;
