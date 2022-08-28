const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  //   console.log((req.session.hi = "a"));
  //   console.log(req.session);
  console.log(req.sessionID);
  res.send("HOMEPAGE");
});
app.get("/1", (req, res) => res.send("1"));

app.get("/viewcount", (req, res) => {
  req.session.count ? (req.session.count += 1) : (req.session.count = 1);
  res.send(`You have viewed this page ${req.session.count} times!`);
});

app.get("/register", (req, res) => {
  const { username = "unknown" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const un = req.session.username;
  res.send(un ? `Hello ${un}!` : "Please go to /register to sign up!");
});

app.listen(3000, () => console.log("session demo listening on port 3000"));
