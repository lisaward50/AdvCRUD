const mongoose = require("mongoose");
const Post = require("./models/post");

const seedData = [
  {
    title: "event1",
    datetime: "21 January",
    location: "Edinburgh, Scotland",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nisi, elementum eget orci vel, consequat convallis leo."
  },
  {
    title: "event2",
    datetime: "25 January",
    location: "London, UK",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nisi, elementum eget orci vel, consequat convallis leo."
  },
  {
    title: "event3",
    datetime: "26 January",
    location: "New York, USA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nisi, elementum eget orci vel, consequat convallis leo."
  }
];

function seedDatabase(){
  seedData.forEach(function(post){
    Post.create(post, function(err, post){
      if(err){
        console.log(err);
      } else {
        console.log("added a new event");
        post.save();
        }
    });
  })
}

module.exports = seedDatabase;
