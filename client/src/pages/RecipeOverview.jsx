import React, { useEffect, useState } from "react";
import { Box, Button, DialogTitle } from "@mui/material";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import CreateEditRecipe from "../components/CreateEditRecipe";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";

const RecipeOverview = () => {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [isDeleteRecipeModalOpen, setIsDeleteRecipeModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState("");
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isEditMode, setisEditMode] = useState(false);

  const getRecipes = async () => {
    const response = await axiosInstance.get("/");
    console.log(response);
    if (response.status === 200) {
      setRecipes(response.data);
    }
  };

  useEffect(() => {
    if (!open && !isDeleteRecipeModalOpen) {
      getRecipes();
    }
  }, [open, isDeleteRecipeModalOpen]);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Add recipe
      </Button>
      <Box display="flex" alignItems="flex-start" sx={{ marginTop: "30px" }}>
        {recipes.map((recipe) => (
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
    </div>
  );
};

export default RecipeOverview;
