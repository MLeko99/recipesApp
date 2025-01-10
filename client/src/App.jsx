import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import RecipeOverview from "./pages/RecipeOverview";
import RecipeDetails from "./pages/RecipeDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />

          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f4f6f9",
              padding: "20px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RecipeOverview />} />
                <Route path="/details/:id" element={<RecipeDetails />} />
              </Routes>
            </BrowserRouter>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              backgroundColor: "#2c3e50",
              color: "#ffffff",
              textAlign: "center",
              padding: "10px 0",
              width: "100%",
              position: "relative",
            }}
          >
            <Footer />
          </Box>
        </Box>
      </PersistGate>
    </Provider>
  );
}

export default App;
