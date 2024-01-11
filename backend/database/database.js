const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = {
  findAll: () => {
    const query = "SELECT * FROM words";
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  saveWord: (word1, word2) => {
    const query = ("INSERT INTO words (word1, word2) VALUES ? ?", [word1, word2]);
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
