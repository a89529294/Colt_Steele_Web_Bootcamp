const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const express = require("express");
const app = express();

//for parsing application/x-www-form-urlencoded in req.body, default when POSTING from a form
app.use(express.urlencoded({ extended: true }));
//for parsing json payload in req.body
app.use(express.json());
// override with POST having ?_method=PATCH
app.use(methodOverride("_method"));

//set view folder to /views adn view engine to ejs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  const newCommentText = req.body.comment;
  comment.comment = newCommentText;
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);

  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("get tacos");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Here are your ${qty} ${meat} tacos.`);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];
