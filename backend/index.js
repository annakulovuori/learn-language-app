const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const cors = require("cors");

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./frontend/dist"));

app.get("/api/locations", (req, res) => {
  connection.query("SELECT * FROM words", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
const server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}.`);
    console.log(process.env); 
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });
