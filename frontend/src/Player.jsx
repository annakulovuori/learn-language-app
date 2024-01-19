import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Player() {
    //käytetään usestatea sanoille, käyttäjän syötteelle, scorelle ja tarkistukselle
  const [words, setWords] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isCorrect, setIsCorrect] = useState([]);

  //haetaan data palvelimelta
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/words`
      );
      setWords(response.data);
      setUserAnswers(new Array(response.data.length).fill(""));
      setScore(null);
      setIsCorrect([]); // Resetoidaan iscorrect
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  //kutsutaan fetchdataa kun sivu latautuu
  useEffect(() => {
    fetchData();
  }, []);

  //käsitellään vastaukset
  //index on muutettavan vastauksen indeksi ja answer uusi vastaus
  //luodaan uusi taulukko, jossa on vanhan taulukon sisältö
  //asetetaan indeksin mukaan vastaus uuteen taulukkoon
  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  //käsittely submit napin painamisen jälkeen
  //luodaan oikeista vastauksista taulukko
  //verrataan annettuja vastauksia oikeisiin
  //luodaan newIsCorrect taulukko jossa käyttäjän vastaus ja tieto oliko se oikein
  const handleSubmit = (event) => {
    event.preventDefault(); //estetään sivun päivittyminen 
    const correctAnswers = words.map((wordObj) => wordObj.word2);
    const newIsCorrect = userAnswers.map((answer, index) => ({
      answer,
      isCorrect: answer === correctAnswers[index],
    }));

    //lasketaan kokonaispistemäärä
    //käytetään reduce funktiota tarkistamaan jokainen vastaus ja lisäämään pisteet
    const totalScore = newIsCorrect.reduce(
      (score, answerObj) => (answerObj.isCorrect ? score + 1 : score),
      0
    );

    //päivitetään score ja isCorrect
    setScore(totalScore);
    setIsCorrect(newIsCorrect);
  };

  const handlePlayAgain = () => {
    fetchData(); // hakee uuden datan ja resetoi kaiken
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
        gap: "20px",
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
      <Button
        type="submit"
        variant="outlined"
        sx={{
          borderColor: "#1E1E1E",
          color: "#1E1E1E",
          "&:hover": { backgroundColor: "#EFB4FA" },
        }}
      >
        SUBMIT
      </Button>
      {score !== null && (
        <>
          <Typography variant="h6">Total Score: {score}</Typography>
          <Button
            variant="outlined"
            onClick={handlePlayAgain}
            sx={{
              borderColor: "#1E1E1E",
              color: "#1E1E1E",
              "&:hover": { backgroundColor: "#EFB4FA" },
            }}
          >
            PLAY AGAIN
          </Button>
        </>
      )}
    </Box>
  );
}
