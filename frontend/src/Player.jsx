import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import axios from "axios";

export default function Player() {
  const [words, setWords] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/words");
      setWords(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      {words.map((wordObj, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h6">{wordObj.word1}</Typography>
          <TextField
            id={`standard-basic-${index}`}
            label={wordObj.word2}
            variant="standard"
          />
        </div>
      ))}
    </Box>
  );
}
