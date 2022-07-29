const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const AppError = require("./AppError");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().catch((err) => console.log(err));
async function main() {
  //change it back to farmStand1, 2 is for testing async errors
  await mongoose.connect("mongodb://localhost:27017/farmStand2");
  console.log("mongo connection open");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res, next) => {
  try {
    const { category } = req.query.category ? req.query : { category: "" };
    const filter = category ? { category } : {};

    const products = await Product.find(filter);
    res.render("products/index", { products, category });
  } catch (e) {
    next(e);
  }
});

app.post("/products", async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const product = await new Product({ name, price: +price, category }).save();
    res.redirect(`products/${product._id}`);
  } catch (e) {
    next(e);
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/products/:id", (req, res, next) =>
  wrapAsyncCallback(req, res, next, async (req, res) => {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    res.render("products/show", { product });
  })
);

app.get("/products/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    res.render("products/edit", { product, categories });
  } catch (e) {
    next(e);
  }
});

app.put("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/products/${id}`);
  } catch (e) {
    next(e);
  }
});

app.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(500).send(message);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function wrapAsyncCallback(req, res, next, acb) {
  try {
    return await acb(req, res);
  } catch (e) {
    next(e);
  }
}
