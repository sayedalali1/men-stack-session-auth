/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require("./middleware/is-signed-in.js");
require('./config/database');

// Controller imports
const authCtrl = require('./controllers/auth');

const app = express();

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// ROUTES
app.use('/auth', authCtrl);

app.get('/vip-lounge', isSignedIn, (req, res, next) => {
    res.send(`Welcome to the party ${req.session.user.username}.`);

});

app.get('/', (req, res, next) => {
  const user = req.session.user;

  res.render('index.ejs', { user });
});

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});