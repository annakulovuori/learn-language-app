const database = require("../database/database");
const express = require("express");
const wordRouter = express.Router();

wordRouter.get("/", async (req, res) => {
  try {
    const words = await database.findAll();
    res.json(words);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

wordRouter.post("/", async (req, res) => {
  try {
    const word1 = req.body.word1;
    const word2 = req.body.word2;
    const response = await database.saveWord(word1, word2);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = wordRouter;
