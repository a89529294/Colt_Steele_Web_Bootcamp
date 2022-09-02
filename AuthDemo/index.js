const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/authDemo");
  console.log("mongo connection open");
}
main().catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "thisisaterriblesecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPw = await bcrypt.hash(password, 12);
  const user = new User({ username, password: hashedPw });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/secret");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const validPw = await bcrypt.compare(password, user.password);
  if (validPw) {
    req.session.user_id = user._id;
    res.redirect("/secret");
  } else res.redirect("/login");
});

app.get("/secret", (req, res) => {
  if (!req.session.user_id) res.redirect("login");
  else res.render("secret");
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  //   req.session.destroy();
  res.redirect("/login");
});

app.listen(3000, () => console.log("Auth Demo listening on port 3000"));
