const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

//MongoDB URI
const dbURI =
  "mongodb+srv://jomark031497:jomark031497@cluster0.zkwyd.mongodb.net/blog-ninja?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("connected to mongoDB");
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
//Register EJS as view engine
app.set("view engine", "ejs");

//3rd party middleware logger
app.use(morgan("tiny"));
app.use(express.static("public"));

//

//Route handlers
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
