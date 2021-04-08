const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    console.log(req.params.id)
    db.query(
        `
        DELETE FROM items
        WHERE seller_id = 1
        AND items.id = ${req.params.id};

      `
    )
    .then(()=> res.sendStatus(200))
    .catch(function(err){
      console.log(err)
      res.sendStatus(400)
    })
  });


  return router;
};
