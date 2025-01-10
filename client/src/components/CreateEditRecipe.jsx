import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createRecipe, editRecipe } from "../redux/recipeSlice";

const CreateEditRecipe = ({ open, handleClose, recipeToEdit, isEditMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode && recipeToEdit) {
      setTitle(recipeToEdit.title || "");
      setDescription(recipeToEdit.description || "");
      setPrepTime(recipeToEdit.prepTime || "");
      setIngredients(recipeToEdit.ingredients || [""]);
      setImage(recipeToEdit.image || "");
      setFileName(recipeToEdit.fileName || "");
    } else {
      resetForm();
    }
  }, [isEditMode, recipeToEdit]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrepTime("");
    setIngredients([""]);
    setImage("");
    setFileName("");
  };

  const handleIngredientChange = (value, index) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index] = value;
      return updatedIngredients;
    });
  };

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleImageUpload = (files) => {
    const fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => {
      setImage(fileLoadedEvent.target.result);
      setFileName(files[0]?.name || "");
    };

    if (files[0]) {
      fileReader.readAsDataURL(files[0]);
    }
  };

  const handleSave = async () => {
    const recipe = {
      id: isEditMode ? recipeToEdit.id : uuidv4(),
      title,
      description,
      prepTime: Number(prepTime),
      ingredients,
      image,
    };

    if (isEditMode) {
      await dispatch(editRecipe(recipe));
    } else {
      await dispatch(createRecipe(recipe));
    }

    handleClose();
    resetForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: (e) => {
          e.preventDefault();
          handleSave();
        },
      }}
    >
      <DialogTitle>{isEditMode ? "Edit Recipe" : "Add Recipe"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Preparation Time (minutes)"
          fullWidth
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          margin="normal"
          type="number"
        />
        <div>
          {ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <TextField
                label={`Ingredient ${index + 1}`}
                fullWidth
                value={ingredient}
                onChange={(e) => handleIngredientChange(e.target.value, index)}
              />
              <Button
                onClick={() => handleRemoveIngredient(index)}
                color="error"
                sx={{ marginLeft: "10px" }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddIngredient} variant="contained">
            Add Ingredient
          </Button>
        </div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button
            component="label"
            variant="contained"
            sx={{ marginRight: "10px" }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          </Button>
          {fileName && (
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              {fileName}
            </Typography>
          )}
        </Box>
        {image && (
          <Box
            component="img"
            src={image}
            alt="Uploaded preview"
            sx={{
              width: "100%",
              maxWidth: "200px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditRecipe;
