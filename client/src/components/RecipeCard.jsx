import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";

const RecipeCard = ({ recipe, setRecipeToEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    setRecipeToEdit(recipe);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 30px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => navigate(`/details/${recipe.id}`)}
    >
      <CardMedia
        component="img"
        height="150"
        image={recipe.image}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ color: "#32a893", marginBottom: "10px" }}
        >
          Preparation time: <b>{recipe.prepTime}</b> minutes
        </Typography>
        <Typography variant="h5" component="div">
          {recipe.title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          sx={{
            backgroundColor: "#3498db",
            "&:hover": {
              backgroundColor: "#2980b9",
            },
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{
            "&:hover": {
              backgroundColor: "#c0392b",
            },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
