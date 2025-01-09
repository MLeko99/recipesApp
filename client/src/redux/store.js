import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "./recipeSlice";
import feedbackReducer from "./feedbackSlice";

export const Store = configureStore({
  reducer: {
    recipes: recipeReducer,
    feedback: feedbackReducer,
  },
});
