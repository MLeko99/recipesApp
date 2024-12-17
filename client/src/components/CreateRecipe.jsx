import {
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  DialogActions,
  Button,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";

const CreateRecipe = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const textFieldStyle = {
    margin: "10px",
  };

  const convertImageToBase64 = (files) => {
    const fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => {
      const base64Image = fileLoadedEvent.target.result;
      setFileName(files[0]?.name);
      setImage(base64Image);
    };

    fileReader.readAsDataURL(files[0]);
  };

  const addIngredient = () => {
    setIngredients((prevState) => [...prevState, ""]);
  };

  const updateIngredient = (newValue, position) => {
    //SHALLOW COPY
    const ingredientCopy = [...ingredients];

    //UPDATE ON SPECIFIC POSITION(INDEX)
    ingredientCopy[position] = newValue;

    //UPDATE VALUE
    setIngredients(ingredientCopy);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson);
        },
      }}
    >
      <DialogTitle>Add recipe</DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          gap: "20px",
        }}
      >
        <TextField
          required
          id="title"
          name="title"
          label="Recipe name"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={textFieldStyle}
        />
        <TextField
          required
          id="description"
          name="description"
          label="Recipe description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={textFieldStyle}
        />
        <TextField
          required
          id="prepTime"
          name="prepTime"
          label="Preparation time"
          variant="outlined"
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          sx={textFieldStyle}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            },
          }}
        />
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {ingredients.map((ingredient, index) => (
              <TextField
                required
                id="description"
                name="description"
                label="Ingredient "
                variant="outlined"
                value={ingredient}
                onChange={(e) => updateIngredient(e.target.value, index)}
                sx={textFieldStyle}
              />
            ))}
          </Box>
          <Button variant="outlined" onClick={() => addIngredient()}>
            +Add ingredient
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{
              width: "150px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            Upload image
            <input
              type="file"
              onChange={(event) => convertImageToBase64(event.target.files)}
              style={{ display: "none" }}
            />
          </Button>
          <Typography>{fileName}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipe;
