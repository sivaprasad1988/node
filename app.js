const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extends: false }));

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.get("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  res.send(`
  <form method="POST" action="/products">
    <input type="text" name="product" />
    <input type="submit" />
  </form>
  `);
});
app.post("/products", (req, res, next) => {
  console.log("In  products!");
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
