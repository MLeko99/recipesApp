import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  return (
    <Card>
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
