import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/details/${recipe.id}`)}>
      <CardMedia
        component="img"
        height="150"
        image={recipe.image}
        sx={{
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Typography
          sx={{
            color: "#32a893",
          }}
        >
          Preparation time: <b>{recipe.prepTime}</b> minutes
        </Typography>
        <Typography variant="h4" component="div">
          {recipe.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
