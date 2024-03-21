const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("/");
  res.send("/index");
});

app.use("/users", (req, res, next) => {
  console.log("/users");
  res.send("/users");
});

app.listen(3000);
