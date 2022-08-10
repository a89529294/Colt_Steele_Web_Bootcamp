const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo")
  .then(() => console.log("MONGO CONNECTION OPEN"))
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = new mongoose.model("User", userSchema);
const Tweet = new mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   const user = new User({ username: "chickenfan99", age: 61 });
//   //   const user = await User.findOne({ username: "chickenfan99" });

//   const tweet2 = new Tweet({ text: "bock bock !!", likes: 999 });
//   const tweet1 = new Tweet({ text: "I love my chicken family", likes: 0 });
//   tweet2.user = user;
//   tweet1.user = user;
//   tweet1.save();
//   tweet2.save();
//   user.save();
// };

// makeTweets();

// Tweet.findOne({ likes: 0 })
//   .populate("users")
//   .then((r) => console.log(r));

const findTweet = async () => {
  const t = await Tweet.find({}).populate("user");
  console.log(t);
};

findTweet();
