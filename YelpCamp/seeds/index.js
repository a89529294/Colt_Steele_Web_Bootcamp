const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}
mongoose.connection.on("open", () => {
  console.log("succesfully connected to mongo db");
});

const seedDb = async () => {
  await Campground.deleteMany();
  const campsArray = [];
  for (let i = 0; i < 50; i++) {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const randomDescriptorIndex = Math.floor(
      Math.random() * descriptors.length
    );
    const randomPlacesIndex = Math.floor(Math.random() * places.length);
    const location =
      cities[randomCityIndex].city + ", " + cities[randomCityIndex].state;
    const title =
      descriptors[randomDescriptorIndex] + " " + places[randomPlacesIndex];
    campsArray.push(
      new Campground({
        title,
        location,
        image: "https://source.unsplash.com/collection/483251",
        description:
          "Consectetur eiusmod excepteur minim in do culpa mollit sunt minim reprehenderit magna laboris culpa nisi. Sint do voluptate fugiat fugiat officia in exercitation eiusmod tempor dolore. Minim velit qui culpa sint nostrud exercitation occaecat nulla ex reprehenderit minim velit. Et ullamco commodo ad amet aute nisi magna excepteur deserunt id velit.",
        price: Math.floor(Math.random() * 20) + 10,
      })
    );
  }
  await Campground.insertMany(campsArray);
  mongoose.connection.close();
};

seedDb();
