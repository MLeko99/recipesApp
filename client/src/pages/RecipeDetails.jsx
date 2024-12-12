import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axios-instance";
import { Typography, Box } from "@mui/material";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  const getRecipeById = async () => {
    const result = await axiosInstance.get(`/${id}`);
    console.log(result);
    if (result.status === 200) {
      setRecipe(result.data);
    }
  };

  useEffect(() => {
    getRecipeById();
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          background: "rgb(131,58,180)",
          background:
            "linear-gradient(357deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="h3">{recipe?.title}</Typography>
          <Typography
            sx={{
              marginTop: "20px",
            }}
            variant="h5"
          >
            {recipe?.description}
          </Typography>
          <img src={recipe?.image} width="100%" height="600px" alt="" />
        </Box>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box>
            <Typography variant="h4">Ingredients:</Typography>
            {recipe?.ingredients?.map((ingredient, index) => (
              <Typography key={index} variant="h5">
                {index + 1}. {ingredient}
              </Typography>
            ))}
          </Box>

          <Box>
            <Typography sx={{ marginBottom: "10px" }} variant="h4">
              Preparation time:
            </Typography>
            <Typography variant="h5">{recipe?.prepTime} minutes</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecipeDetails;
