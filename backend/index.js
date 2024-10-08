const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const cors = require("cors");
const wordRouter = require("./routes/wordRouter");

const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./frontend/dist"));

//Käytetään wordRouteria kaikissa pyynnöissä mitkä tulee kyseiseen osoitteeseen
app.use("/api/words", wordRouter);

//käytetään serverinä expressiä ja käynnistetään se.
const server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}.`);
    console.log(process.env);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });
