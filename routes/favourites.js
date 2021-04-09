/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    const userID = req.session['user_id'];
    db.query(`
    SELECT * FROM favourites
    JOIN items ON items.id = item_id
    WHERE user_id = $1
    AND is_fav = TRUE;
    `, [userID]
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
