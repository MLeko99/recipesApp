import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";

const RecipeCard = ({ recipe, setRecipeToEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    setRecipeToEdit(recipe);
  };

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
      <CardActions>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
