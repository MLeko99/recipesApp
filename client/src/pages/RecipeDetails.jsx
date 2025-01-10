import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../axios-instance";
import { Typography, Box, Button } from "@mui/material";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Navigate hook for back button

  const getRecipeById = async () => {
    const result = await axiosInstance.get(`/${id}`);
    if (result.status === 200) {
      setRecipe(result.data);
    }
  };

  useEffect(() => {
    getRecipeById();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#eaf4fc", // Soft blue background
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "50px auto",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          alignSelf: "flex-start",
          marginBottom: "20px",
          backgroundColor: "#3498db",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2980b9",
          },
        }}
      >
        ← Back to Recipes
      </Button>
      <Typography
        variant="h3"
        sx={{
          color: "#2c3e50", // Dark blue for title
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {recipe?.title}
      </Typography>
      <Box
        component="img"
        src={recipe?.image}
        alt=""
        sx={{
          width: "60%", // Reduced size for better proportion
          maxWidth: "400px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#27ae60", // Soft green for ingredients heading
            marginBottom: "10px",
          }}
        >
          Ingredients:
        </Typography>
        {recipe?.ingredients?.map((ingredient, index) => (
          <Typography
            key={index}
            variant="h6"
            sx={{
              marginBottom: "5px",
              color: "#34495e", // Neutral dark gray for ingredient text
            }}
          >
            {index + 1}. {ingredient}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default RecipeDetails;
