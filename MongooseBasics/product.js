const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be positive"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

productSchema.methods.toggle = function () {
  this.onSale = !this.onSale;
  return this.save();
};
productSchema.statics.fireSale = async function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};
const Product = mongoose.model("Product", productSchema);
const bike = new Product({
  name: "Cycling Jersey",
  price: 39.99,
  categories: ["Cycling", "Safety"],
  size: "XS",
});

main().catch((e) => console.log(e));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
  console.log("it worked!");
  //   bike
  //     .save()
  //     .then((d) => console.log(d))
  //     .catch((e) => console.log(e));

  //   Product.findOne({ name: "Tire Pump" }).then((d) => {
  //     console.log(d);
  //     d.toggle().then((r) => console.log(r));
  //   });

  const foundProduct = await Product.findOne({ name: "Tire Pump" });
  console.log(foundProduct);
  foundProduct.toggle();
  console.log(foundProduct);

  //   Product.fireSale().then((r) => console.log(r));

  //   bike.toggle(1, 2);
}
