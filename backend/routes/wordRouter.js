const database = require("./database/database");
const express = require("express");
const wordRouter = express.Router();

wordRouter.get("/", async (req, res) => {
  try {
    const words = await database.findAll();
    res.json(words);
  } catch (err) {
    res.status(500).json({ msq: err });
  }
});

module.exports = wordRouter;

