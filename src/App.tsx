import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
import theme from "./theme.tsx";
import PrimaryBar from "./Components/PrimaryBar.tsx";
import { useState } from "react";
import MainDrawer from "./Components/Drawers/MainDrawer.tsx";
import { AuthProvider } from "./AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Pages/AppRoutes.tsx";
import { Provider } from "react-redux";
import store from "./redux/Store.ts";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Box
              sx={{
                bgcolor: "background.default",
                color: "text.primary",
                minHeight: "100dvh",
              }}
            >
              <PrimaryBar handleMenuClick={handleMenuClick} />
              <AppRoutes />
              <MainDrawer open={open} handleMenuClick={handleMenuClick} />
            </Box>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
