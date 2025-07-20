const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "cover-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  console.log(req.file);
  const { title, body } = req.body;
  await Blog.create({
    title: title,
    body: body,
    createdBy: req.user._id,
    coverImageURL: `${req.file.filename}`,
  });
  return res.redirect("/");
});

module.exports = router;
