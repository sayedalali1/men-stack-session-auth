
const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const app = express();

require('./config/database');
const methodOverride = require("method-override");
const morgan = require("morgan");

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

const authController = require("./controllers/auth.js");

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// ROUTES
app.use("/auth", authController);

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});