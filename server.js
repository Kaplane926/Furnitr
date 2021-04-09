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
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
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



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
//app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
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


// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  res.redirect("furnitr");
});

// app.post("/", (req, res) => {
//   const user = user;
//   if (user) {
//     const templateVars = {
//      items: items[req.items],
//      user: users[req.users]
//     }
//     return res.render("index", templateVars);
//   }
// });

app.get("/furnitr", (req, res) => {
  res.render("furnitr");
});

/*app.post("/furnitr", (req, res) => {
  db.query(`
  SELECT * FROM items
  LIMIT 1;
  `
  )
    .then(data => {
      //const users = data.rows;
      //res.json({ users });
      res.send(data)
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

// app.post("/profile", (req, res) => {
//   const user = user;
//   if (user) {
//     const templateVars = {
//      items: items[req.items],
//      user: users[req.users]
//     }
//     return res.render("profiles", templateVars);
//   }
// });

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

// app.post('/new_listing', (req, res) => {
//   if (user) {
//     const templateVars = {
//       items: items
//     }
//   }
//   res.send('POST request to items')
//   res.redirect("furniture profile");
// });




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

// app.post("/messages", (req, res) => {

// });

app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/furnitr');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

/*app.get("*", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  res.status(404);
  res.render("404", templateVars);
});
*/
