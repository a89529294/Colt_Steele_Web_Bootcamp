const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysecret"));
app.get("/greet", (req, res) => {
  console.log(req.cookies);
  res.send(`hey there! ${req.cookies.name}`);
});
app.get("/setName", (req, res) => {
  res.cookie("name", "henrieta");
  res.send("Ok You have a cookie");
});
app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("here is your signed cookie");
});
app.get("/verifyfruit", (req, res) => {
  console.log(req.signedCookies);
  console.log(req.cookies);
  res.send(req.signedCookies);
});

app.listen(3000, () => console.log("cookies demo listening on port 3000"));
