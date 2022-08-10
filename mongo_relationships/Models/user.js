const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo")
  .then(() => console.log("MONGO CONNECTION OPEN"))
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  address: [
    {
      _id: false,
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });
  u.address.push({
    street: "123 Seasame St.",
    city: "New York",
    state: "New York",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        address: {
          street: "123 Seasame St.",
          city: "New York",
          state: "New York",
          country: "USA",
        },
      },
    },
    { returnDocument: "after" }
  );
  console.log(user);
};

addAddress("62f302d2edba8b30385677b9");

// makeUser();
