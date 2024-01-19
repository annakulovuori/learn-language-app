import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Admin() {
  const [words, setWords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newWord1, setNewWord1] = useState("");
  const [newWord2, setNewWord2] = useState("");
  const [editValues, setEditValues] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/words`
      );
      setWords(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    const currentWordPair = words.find((wordPair) => wordPair.ID === id);
    const updatedWordPair = editValues[id];

    if (!updatedWordPair) {
      console.error("No edit values found for ID:", id);
      return;
    }

    const payload = {
      word1: updatedWordPair.word1 || currentWordPair.word1,
      word2: updatedWordPair.word2 || currentWordPair.word2,
    };

    console.log("Editing word pair:", id, payload);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/words/${id}`,
        payload
      );
      fetchData();
      setEditValues((prev) => ({ ...prev, [id]: undefined }));
    } catch (err) {
      console.error("Error editing words:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/words/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/words`, {
        word1: newWord1,
        word2: newWord2,
      });
      fetchData();
      setNewWord1("");
      setNewWord2("");
      handleDialogClose();
    } catch (err) {
      console.error("Error adding new words:", err);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
    >
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <p>Add a new word pair</p>
        <IconButton onClick={handleDialogOpen}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Word Pair</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="word1"
            label="Word 1"
            type="text"
            fullWidth
            variant="standard"
            value={newWord1}
            onChange={(e) => setNewWord1(e.target.value)}
          />
          <TextField
            margin="dense"
            id="word2"
            label="Word 2"
            type="text"
            fullWidth
            variant="standard"
            value={newWord2}
            onChange={(e) => setNewWord2(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>

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
          <TextField
            margin="dense"
            id={`edit-word1-${wordObj.ID}`}
            label={wordObj.word1}
            type="text"
            fullWidth
            variant="standard"
            value={editValues[wordObj.ID]?.word1 || ""}
            onChange={(e) =>
              setEditValues((prev) => ({
                ...prev,
                [wordObj.ID]: { ...prev[wordObj.ID], word1: e.target.value },
              }))
            }
          />
          <TextField
            margin="dense"
            id={`edit-word2-${wordObj.ID}`}
            label={wordObj.word2}
            type="text"
            fullWidth
            variant="standard"
            value={editValues[wordObj.ID]?.word2 || ""}
            onChange={(e) =>
              setEditValues((prev) => ({
                ...prev,
                [wordObj.ID]: { ...prev[wordObj.ID], word2: e.target.value },
              }))
            }
          />
          <Button
            variant="outlined"
            onClick={() => handleEdit(wordObj.ID)}
            sx={{
              borderColor: "#1E1E1E",
              color: "#1E1E1E",
              "&:hover": { backgroundColor: "#EFB4FA" },
            }}
          >
            SAVE
          </Button>

          <IconButton onClick={() => handleDelete(wordObj.ID)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </Box>
  );
}
