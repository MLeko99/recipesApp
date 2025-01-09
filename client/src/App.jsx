import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import RecipeOverview from "./pages/RecipeOverview";
import RecipeDetails from "./pages/RecipeDetails";
import { Typography } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import UserFeedback from "./components/UserFeedback";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserFeedback />
          <Typography variant="h2">Recipe App</Typography>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RecipeOverview />} />
              <Route path="/details/:id" element={<RecipeDetails />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
