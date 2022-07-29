const express = require("express");
const app = express();
const AppError = require("./AppError");

//runs on every req, no matter the path, no matter the verb
app.use((req, res, next) => {
  console.log(req.method);
  req.requestTime = Date.now();
  next();
});
//runs on the path '/dogs', no matter the verb
app.use("/dogs", (req, res, next) => {
  console.log("I love dogs");
  next();
});

// app.use((req, res, next) => {
//   console.log("middleware ONE");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("middleware TWO");
//   next();
// });

const verifyPassword = (req, res, next) => {
  if (req.query.password === "chickennugget") next();
  throw new AppError("Password Required!?", 401);
};

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/dogs", (req, res) => {
  res.send("woof woof");
  console.log(req.requestTime);
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("secret page");
});

app.get("/error", (req, res) => {
  chicken.fly();
});

//404 route
app.use((req, res) => {
  res.status(404).send(req.url + " not found");
});

//error handler
app.use((err, req, res, next) => {
  console.log("errorroror");
  next(err);
});

// app.use((err, req, res, next) => {
//   res.send("end of error handlers");
// });

app.listen(3000, () => console.log("listening on port 3000"));
