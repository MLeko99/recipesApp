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
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../axios-instance";
import React, { useState, useEffect } from "react";

const CreateRecipe = ({ open, handleClose, recipeToEdit, isEditMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const textFieldStyle = {
    margin: "10px",
  };

  useEffect(() => {
    if (isEditMode) {
      setTitle(recipeToEdit?.title);
      setDescription(recipeToEdit?.description);
      setImage(recipeToEdit?.image);
      setPrepTime(recipeToEdit?.prepTime);
      setIngredients(recipeToEdit?.ingredients);
    }
  }, [isEditMode]);

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

  const removeIngredient = (position) => {
    const ingredientCopy = [...ingredients];

    const filteredIngredients = ingredientCopy.filter(
      (item, index) => index !== position
    );

    setIngredients(filteredIngredients);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setPrepTime("");
    setIngredients([""]);
    setImage("");
    setFileName("");
  };

  const createRecipe = async () => {
    const recipe = {
      id: uuidv4(),
      title,
      description,
      prepTime: parseInt(prepTime, 10),
      ingredients,
      image,
    };

    const response = await axiosInstance.post("/", recipe);

    if (response.status === 201) {
      reset();

      handleClose();
    }
  };

  const isDisabled =
    !title ||
    !description ||
    !image ||
    !prepTime ||
    !ingredients.every((ingredient) => !!ingredient);

  const close = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={close}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          createRecipe();
        },
      }}
    >
      <DialogTitle>{isEditMode ? "Edit" : "Add"} recipe</DialogTitle>
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <TextField
                  required
                  id={ingredient + index}
                  name={ingredient + index}
                  label="Ingredient "
                  variant="outlined"
                  value={ingredient}
                  onChange={(e) => updateIngredient(e.target.value, index)}
                  sx={{ ...textFieldStyle, width: "80%" }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    marginRight: "10px",
                  }}
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
          <Button
            sx={{ float: "right", marginRight: "10px" }}
            variant="outlined"
            onClick={() => addIngredient()}
          >
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
        <Button variant="contained" type="submit" disabled={isDisabled}>
          {isEditMode ? "Edit" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipe;
