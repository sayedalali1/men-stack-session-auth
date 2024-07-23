const User = require("../models/user.js");
const express = require("express");
const router = express.Router();

router.get("/sign-up", (req, res, next) => {
    res.render("auth/sign-up.ejs");
  });

  router.post("/sign-up", async (req, res, next) => {
    res.send("Form submission accepted!");
  });
  

module.exports = router;