const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("MongoDB connected"));
const path = require("path");
const userRouter = require("./routes/user");
const checkForAuthenticationCookie = require("./middlewares/authentication");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) =>
  res.render("home", {
    user: req.user,
  })
);
app.use("/user", userRouter);
const PORT = 8000;

app.listen(PORT, () => console.log("App has started on Port ", PORT));
