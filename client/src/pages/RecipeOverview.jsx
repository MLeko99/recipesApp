import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import CreateRecipe from "../components/CreateRecipe";

const RecipeOverview = () => {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);

  const getRecipes = async () => {
    const response = await axiosInstance.get("/");
    console.log(response);
    if (response.status === 200) {
      setRecipes(response.data);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Add recipe
      </Button>
      <Box display="flex" alignItems="flex-start" sx={{ marginTop: "30px" }}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </Box>
      <CreateRecipe open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default RecipeOverview;
