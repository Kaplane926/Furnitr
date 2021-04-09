/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    const userID = req.session['user_id']
    db.query(
        `
        INSERT INTO favourites (user_id, item_id, is_fav)
        VALUES ($1, ${req.params.id}, TRUE)
        ;
      `, [userID]
    )
    .then(()=> res.sendStatus(200))
    .catch(function(err){
      console.log(err)
      res.sendStatus(400)
    })
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
