// app.get("/messages", (req, res) => {
//   res.send("messages");
// });

// "use strict";

// const userHelper    = require("../lib/util/user-helper")

// const express       = require('express');
// const tweetsRoutes  = express.Router();

// module.exports = function(DataHelpers) {

//   tweetsRoutes.get("/", function(req, res) {
//     DataHelpers.getTweets((err, tweets) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         res.json(tweets);
//       }
//     });
//   });

//   tweetsRoutes.post("/", function(req, res) {
//     if (!req.body.text) {
//       res.status(400).json({ error: 'invalid request: no data in POST body'});
//       return;
//     }

//     const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
//     const tweet = {
//       user: user,
//       content: {
//         text: req.body.text
//       },
//       created_at: Date.now()
//     };

//     DataHelpers.saveTweet(tweet, (err) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         res.status(201).send();
//       }
//     });
//   });

//   return tweetsRoutes;

// }


const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/messages/:id", (req, res) => {
    console.log("here router");
    const userID = req.params.id;

    const sql = `
    SELECT m.message, m.msg_created,
      CASE
        WHEN u.role = 1 AND u.id = m.buyer_id THEN 'me'
        WHEN u.role = 2 AND u.id = m.seller_id THEN 'me'
        ELSE 'contact' END AS msg_class
    FROM users u
    LEFT JOIN messages m ON (m.buyer_id = u.id OR m.seller_id = u.id)
    WHERE u.id = $1
    `;

    db.query(sql, [userID])
      .then(data => {
        console.log("hello world");
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
