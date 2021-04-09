// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Separated Routes for each Resource
const messagesRoutes = require("./routes/messages");
const furnitrRoutes = require("./routes/furnitr");
const furnitrFavouriteRoutes = require("./routes/furnitrFavourite");
const furnitrDislikeRoutes = require("./routes/furnitrDislike");
const favouritesRoutes = require("./routes/favourites");
const logoRoutes = require("./routes/logo");
const unfavouriteRoutes = require("./routes/unfavourite");
const createNewListingRoutes = require("./routes/createNewListing");
const sendMessageRoutes = require("./routes/sendMessage");
const itemsRoutes = require("./routes/items");
const searchRoutes = require("./routes/search_results");
const removeItemRoutes = require("./routes/removeItem");
const soldItemRoutes = require("./routes/soldItem");



// Mount all resource routes
app.use("/api/messages", messagesRoutes(db));
app.use("/api/furnitr", furnitrRoutes(db));
app.use("/api/furnitrFavourite", furnitrFavouriteRoutes(db));
app.use("/api/furnitrDislike", furnitrDislikeRoutes(db));
app.use("/api/favourites", favouritesRoutes(db));
app.use("/api/logo", logoRoutes(db));
app.use("/api/unfavourite", unfavouriteRoutes(db));
app.use("/api/createNewListing", createNewListingRoutes(db));
app.use("/api/sendMessage", sendMessageRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/search_results", searchRoutes(db));
app.use("/api/removeItem", removeItemRoutes(db));
app.use("/api/soldItem", soldItemRoutes(db));




// Home page

app.get("/", (req, res) => {
  res.redirect("furnitr");
});

app.get("/furnitr", (req, res) => {
  res.render("furnitr");
});

// user profile

app.get("/profile", (req, res) => {
  res.render("profiles");
});

app.get("/my_listings", (req, res) => {
  res.render("my_listings");
});


app.get("/favourites", (req, res) => {
  res.render("furnitrFavourite");
});

// new listing

app.get("/new_listing", (req, res) => {
  res.render("new_listing");
});

// items

app.get("/items", (req, res) => {
  res.render("items");
});


// furniture profile

app.get("/furniture", (req, res) => {
  res.render("furniture_profile");
});


// messages

app.get("/messages/:id", (req, res) => {
  const id = req.params.id;
  res.render(`messages`);
});


// search

app.get("/search_results", (req, res) => {
  res.render("search_results");
});


app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/furnitr');
});

app.get("/error", (req, res) =>{
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
