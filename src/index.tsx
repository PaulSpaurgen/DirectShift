import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          padding: "2px 5px",
          fontSize: "12px",
          fontWeight: "500",
          textTransform: "none",
          color: "#292929 !important",
          bgcolor: "white !important",
          borderColor: "#292929 !important",
          ":hover": {
            color: "#292929",
            bgcolor: "white",
            borderColor: "#292929",
          },
        },
        outlined:{
          padding: "2px 5px",
          fontSize: "12px",
          fontWeight: "500",
          textTransform: "none",
        }
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
