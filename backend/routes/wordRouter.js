const database = require("../database/database");
const express = require("express");
const wordRouter = express.Router();

//Routen funktio, joka käsittelee get pyynnöt
//käytetään findAll database metodia ja muutetaan tulos jsoniksi
wordRouter.get("/", async (req, res) => {
  try {
    const words = await database.findAll();
    res.json(words);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//Routen funktio, joka käsittelee post pyynnöt
//käytetään saveWord database metodia, jolle annetaan sanat ja tallennuksen onnistuessa annetaan ok status
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

//Routen funktio, joka käsittelee delete pyynnöt
//käytetään deleteById database metodia, jolle annetaan id ja poiston onnistuessa annetaan ok status
wordRouter.delete("/:myId([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    const result = await database.deleteById(id);
    res.status(204).json(result);
  } catch (err) {
    res.status(400).json({ msg: "cannot find ID" });
  }
});

//Routen funktio, joka käsittelee put pyynnöt
//vertaillaan haluttuja key sanoja saatuihin ja jos ne on samat, tallennetaan uudet sanat muuttujaan
//käytetään updateById database metodia, jolle annetaan id ja uudet sanat. 
wordRouter.put("/:myId([0-9]+)", async (req, res) => {
  try {
    const expectedKeys = ["word1", "word2"];
    const receivedKeys = Object.keys(req.body);

    if (
      expectedKeys[0] !== receivedKeys[0] ||
      expectedKeys[1] !== receivedKeys[1]
    ) {
      return res.status(400).json({
        error: "Invalid keys.",
      });
    }

    const id = parseInt(req.params.myId);
    const updatedWords = req.body;

    const result = await database.updateById(id, updatedWords);
    res.json(result);
  } catch (err) {
    res.status(404).send({ msg: "cannot find ID" });
  }
});

module.exports = wordRouter;
