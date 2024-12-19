import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import CreateEditRecipe from "../components/CreateEditRecipe";

const RecipeOverview = () => {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
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
    if (!open) {
      getRecipes();
    }
  }, [open]);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Add recipe
      </Button>
      <Box display="flex" alignItems="flex-start" sx={{ marginTop: "30px" }}>
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            setRecipeToEdit={(recipe) => {
              setRecipeToEdit(recipe);
              setisEditMode(true);
              setOpen(true);
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
    </div>
  );
};

export default RecipeOverview;
