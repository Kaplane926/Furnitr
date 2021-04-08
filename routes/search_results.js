"use strict";

const searchHelper    = require(".public/scripts/search")

const express       = require('express');
const searchRoutes  = express.Router();

module.exports = function(DataHelpers) {

  searchRoutes.get("/search_results", function(req, res) {
    DataHelpers.getResults((err, searches) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(searches);
      }
    });
  });

  searchRoutes.post("/search_results", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const search = {
      content: {
        text: req.body.text
      }
    };

    DataHelpers.saveResults(search, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return searchRoutes;

}
