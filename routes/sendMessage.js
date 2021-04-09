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
    const itemId = req.params.id;
    const userId = req.session['user_id'];
    const msg = req.body.data;
    const sql = `
    INSERT INTO messages (recipient_id, sender_id, item_id, message, msg_created)
    SELECT i.seller_id, u.id, i.id, $1, CURRENT_DATE
    FROM items i
    INNER JOIN users u ON u.id = $2
    WHERE i.id = $3;
    `;

    db.query(sql, [msg, userId, itemId])
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
