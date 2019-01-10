const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const Comment        = require("./models/comment");
const Post           = require("./models/post");
const seedDatabase   = require("./seed");
const commentRoutes  = require("./routes/comments");
const postRoutes     = require("./routes/posts");
const indexRoutes    = require("./routes/index");
const PORT           = process.env.PORT || 3000;
const url            = "mongodb://localhost:27017/elevate";

mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDatabase();

app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);

app.listen(PORT, function(){
  console.log("Server up and running");
});
