const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo")
  .then(() => console.log("MONGO CONNECTION OPEN"))
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Product = new mongoose.model("Product", productSchema);
const Farm = new mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   {
//     name: "Goddess Melon",
//     price: 4.99,
//     season: "Summer",
//   },
//   {
//     name: "Sugar Baby Watermelon",
//     price: 5.99,
//     season: "Summer",
//   },
//   {
//     name: "Asparagus",
//     price: 1.99,
//     season: "Spring",
//   },
// ]);

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
//   const melon = await Product.findOne({ name: "Goddess Melon" });
//   farm.products.push(melon.id);
//   farm.save();
// };
// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const melon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farm.products.push(melon);
  farm.save();
  console.log(farm);
};
// addProduct();

Farm.findOne({ name: "Full Belly Farms" })
  .populate("products")
  .then((r) => {
    console.log(r);
  });
