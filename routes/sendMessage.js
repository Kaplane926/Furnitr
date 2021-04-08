/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/:msg", (req, res) => {
    console.log(req.params.msg)
    const value = [req.params.msg]
    console.log('the route is wokring!')
    /*db.query(`
    INSERT INTO messages
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
*/
  });
  return router;
};

