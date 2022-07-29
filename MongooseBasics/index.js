const mongoose = require("mongoose");

main().catch((e) => console.log("error error"));

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

//here Movie is a JavaScript class, once we call the save method, mongoose will create a movies collection in movieApp database
const Movie = mongoose.model("Movie", movieSchema);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/movieApp");

  //   const amadeus = new Movie({
  //     title: "Amadeus",
  //     year: 1986,
  //     score: 9.2,
  //     rating: "R",
  //   });
  //   //save it to Mongo db
  //   amadeus.save();

  //   //save multiple items at once, no need to call save, mongoose does it for us
  //   Movie.insertMany([
  //     { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
  //     { title: "Alien", year: 1979, score: 8.1, rating: "R" },
  //     { title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG" },
  //     { title: "Stand By Me", year: 1986, score: 8.6, rating: "R" },
  //     { title: "Moonrise Kingdom", year: 2012, score: 7.3, rating: "PG-13" },
  //   ]).then((data) => {
  //     console.log("it worked!");
  //     console.log(data);
  //   });
  console.log("it worked!");
}
