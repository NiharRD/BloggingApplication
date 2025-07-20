const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogs");
const cookieparser = require("cookie-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("MongoDB connected"));
const path = require("path");
const userRouter = require("./routes/user");
const checkForAuthenticationCookie = require("./middlewares/authentication");
const Blog = require("./models/blog");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token")); // runs globally and set req.user=userpayloads
app.use("/images", express.static(path.resolve("./public/images")));
app.get("/", async (req, res) => {
  // Fetch all blogs along with the user who created them
  const allBlogs = await Blog.find({}).populate("createdBy");
  console.log("req.user in home route:", req.user);
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRouter);
app.use("/blog", blogRouter);
const PORT = 8000;

app.listen(PORT, () => console.log("App has started on Port ", PORT));
