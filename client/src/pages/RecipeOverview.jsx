import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";

const RecipeOverview = () => {
  const [recipes, setRecipes] = useState([]);

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
      <h2>Overview</h2>
      <Box display="flex" alignItems="flex-start">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </Box>
    </div>
  );
};

export default RecipeOverview;
