import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import axios from "axios";

export default function Player() {
  const [words, setWords] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isCorrect, setIsCorrect] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/words");
      setWords(response.data);
      setUserAnswers(new Array(response.data.length).fill(""));
      setScore(null);
      setIsCorrect([]); // Reset isCorrect array
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const correctAnswers = words.map((wordObj) => wordObj.word2);
    const newIsCorrect = userAnswers.map((answer, index) => ({
      answer,
      isCorrect: answer === correctAnswers[index],
    }));

    const totalScore = newIsCorrect.reduce(
      (score, answerObj) => (answerObj.isCorrect ? score + 1 : score),
      0
    );

    setScore(totalScore);
    setIsCorrect(newIsCorrect);
  };

  const handlePlayAgain = () => {
    fetchData(); // Fetch new data and reset the state
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
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
            label=""
            variant="standard"
            value={userAnswers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          {score !== null && (
            <Typography
              variant="body2"
              color={isCorrect[index]?.isCorrect ? "green" : "red"}
            >
              {isCorrect[index]?.isCorrect ? "Correct" : "Incorrect"}
            </Typography>
          )}
        </div>
      ))}
      <button type="submit" style={{ margin: "20px" }}>
        SUBMIT
      </button>
      {score !== null && (
        <>
          <Typography variant="h6">Total Score: {score}</Typography>
          <button style={{ margin: "20px" }} onClick={handlePlayAgain}>
            PLAY AGAIN
          </button>
        </>
      )}
    </Box>
  );
}
