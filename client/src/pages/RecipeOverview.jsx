import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import CreateEditRecipe from "../components/CreateEditRecipe";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../redux/recipeSlice";

const RecipeOverview = () => {
  const [open, setOpen] = useState(false);
  const [isDeleteRecipeModalOpen, setIsDeleteRecipeModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState("");
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isEditMode, setisEditMode] = useState(false);

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  const getRecipes = async () => {
    const response = await axiosInstance.get("/");
    if (response.status === 200) {
      dispatch(setRecipes(response.data));
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f9",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: "80px", // Space for footer
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#3498db",
          "&:hover": { backgroundColor: "#2980b9" },
        }}
        onClick={() => setOpen(true)}
      >
        + Add recipe
      </Button>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            setRecipeToEdit={(recipe) => {
              setRecipeToEdit(recipe);
              setisEditMode(true);
              setOpen(true);
            }}
            onDelete={() => {
              setIsDeleteRecipeModalOpen(true);
              setRecipeToDelete(recipe);
            }}
          />
        ))}
      </Box>
      <CreateEditRecipe
        open={open}
        handleClose={() => setOpen(false)}
        isEditMode={isEditMode}
        recipeToEdit={recipeToEdit}
      />
      <ConfirmDeleteDialog
        open={isDeleteRecipeModalOpen}
        handleClose={() => setIsDeleteRecipeModalOpen(false)}
        recipeToDelete={recipeToDelete}
      />
    </Box>
  );
};

export default RecipeOverview;
