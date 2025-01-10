import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../axios-instance";
import { Typography, Box, Button } from "@mui/material";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
        minHeight: "300px",
        backgroundColor: "#f4f6f9",
      }}
    >
      {/* Header and Back Button */}
      <Box>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#3498db",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#2980b9",
            },
          }}
        >
          ← Back to Recipes
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            maxWidth: "900px",
            width: "100%",
            margin: "20px auto",
            alignItems: "center",
          }}
        >
          {/* Image Section */}
          <Box
            component="img"
            src={recipe?.image}
            alt={recipe?.title}
            sx={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Details Section */}
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                marginBottom: "15px",
                marginTop: "0px",
                color: "#2c3e50",
                fontWeight: "bold",
              }}
            >
              {recipe?.title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                marginBottom: "10px",
                color: "#27ae60",
                fontWeight: "bold",
              }}
            >
              Ingredients:
            </Typography>

            <Box
              sx={{
                maxHeight: "100px",
                overflowY: "auto",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "15px",
                boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.05)",
              }}
            >
              {recipe?.ingredients?.map((ingredient, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    color: "#34495e",
                    marginBottom: "5px",
                    fontSize: "16px",
                  }}
                >
                  {index + 1}. {ingredient}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeDetails;
