const User = require("../models/user.js");
const express = require("express");
const router = express.Router();

router.get("/sign-up", (req, res, next) => {
    res.render("auth/sign-up.ejs");
  });

  router.post("/sign-up", async (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {
      const existingUser = await User.findOne({
         username,

      });

      if (existingUser) {
        return res.send("Ooops Something went wrong");
    }

    if (password !== confirmPassword) {
      return res.send("Password and Confirm Password do not match");
    }
  } catch (error){}  
    });
  

module.exports = router;