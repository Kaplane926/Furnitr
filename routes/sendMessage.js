/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/:itemId/:contactId", (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.session['user_id'];
    const contactId = req.params.contactId;
    console.log(`itemId ${itemId} userId ${userId} contactId ${contactId}`);
    const msg = req.body.data;
    const sql = `
    INSERT INTO messages (recipient_id, sender_id, item_id, message, msg_created)
    VALUES ($1, $2, $3, $4, CURRENT_DATE);
    `;

    db.query(sql, [contactId, userId, itemId, msg])
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
