const express = require("express");
const app = express();

// app.use((req, res) => {
//   console.log("we got a new request");
//   res.send("helloooo");
// });

app.get("/", (req, res) => {
  res.send("<h1>this is the home page!!!</h1>");
});

//path params
app.get("/r/:subreddit", (req, res) => {
  console.log(req.params);
  res.send(`this is ${req.params.subreddit}`);
});

//query string ?q=...
app.get("/search", (req, res) => {
  if (!req.query.q) res.send("nothing found is nothing searched!");
  else res.send(`search results for:${req.query.q}`);
});

app.get("/cats", (req, res) => {
  res.send("cats");
});

app.get("/dogs", (req, res) => {
  res.send("dogs");
});

app.get("*", (req, res) => {
  res.send('i don"t know that path');
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
