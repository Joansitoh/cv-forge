import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App.jsx";
import "./i18n";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <App />
  </LocalizationProvider>
);
