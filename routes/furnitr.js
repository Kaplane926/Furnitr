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
    //const values = [1, 1]
    db.query(`
    SELECT * FROM items i
    LEFT JOIN favourites f
    ON i.id = f.item_id
    AND f.user_id = 1
    WHERE f.fav_id IS NULL;
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

  });
  return router;
};

const likeItem = function(){
  const values = []
  const queryString = `
  INSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2);
  `
}
