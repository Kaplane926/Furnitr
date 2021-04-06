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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const furnitrRoutes = require("./routes/furnitr");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/furnitr", furnitrRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const user = user;
  if (user) {
    const templateVars = {
     items: items[req.items],
     user: users[req.users]
    }
    return res.render("index", templateVars);
  }
});

app.get("/furnitr", (req, res) => {
  res.render("furnitr");
});

/*app.post("/furnitr", (req, res) => {
  db.query(`
  SELECT * FROM items;
  `
  )
    .then(data => {
      //const users = data.rows;
      //res.json({ users });
      console.log(data)
    })
    .catch(err => {
      console.log(err)
      res
        .status(500)
        .json({ error: err.message });
    });

});*/


// user profile


app.get("/profile", (req, res) => {
  res.render("profiles");
});

app.post("/profile", (req, res) => {
  const user = user;
  if (user) {
    const templateVars = {
     items: items[req.items],
     user: users[req.users]
    }
    return res.render("profiles", templateVars);
  }
});


// new listing

app.get("/new_listing", (req, res) => {
  res.render("new_listing");
});

app.post('/new_listing', (req, res) => {
  if (user) {
    const templateVars = {
      items: items
    }
  }
  res.send('POST request to items')
  res.redirect("furniture profile");
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

app.get("/messages", (req, res) => {
  res.render("messages");
});

app.post("/messages", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("*", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  res.status(404);
  res.render("404", templateVars);
});
