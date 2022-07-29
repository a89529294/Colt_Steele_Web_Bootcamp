const Product = require("./models/product");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  //remember to change back to farmStand, 2 is for async error testing!!!
  await mongoose.connect("mongodb://localhost:27017/farmStand2");
  console.log("mongo connection open");
}

Product.deleteMany().then((r) => {
  console.log("deleted: " + JSON.stringify(r));
  Product.insertMany([
    {
      name: "Ruby Grapefruit",
      price: 1.99,
      category: "fruit",
    },
    {
      name: "Fairy Eggplant",
      price: 1.0,
      category: "vegetable",
    },
    {
      name: "Organic Goddess Melon",
      price: 4.99,
      category: "fruit",
    },
    {
      name: "Organic Mini Seedless Watermelon",
      price: 3.99,
      category: "fruit",
    },
    {
      name: "Organic Celery",
      price: 1.5,
      category: "vegetable",
    },
    {
      name: "Chocolate Whole Milk",
      price: 2.69,
      category: "dairy",
    },
  ])
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
});
