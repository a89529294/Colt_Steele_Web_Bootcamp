const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const express = require("express");
const ExpressError = require("./utils/ExpressError");
const campgroundRouter = require("./routes/campgrounds");
const reviewRouter = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();

main().catch((err) => console.log(err));
``;

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}

mongoose.connection.on("open", () => {
  console.log("successfully connected to mongo db");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// how passport stores and retreives user in session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/campgrounds", campgroundRouter);
app.use("/campgrounds/:id/reviews", reviewRouter);

app.use("/fakeUser", async (req, res) => {
  const u = new User({ email: "abc@example.com", username: "abc" });
  const nu = await User.register(u, "chicken");
  res.send(nu);
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Oh no! Something went wrong.";
  res.status(500);
  res.render("error", { err });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
