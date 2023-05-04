import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Theme from "./public/themes/theme";

const RootEl = document.querySelector("#root");
if (!RootEl) {
  throw new Error("can not find root element");
}
const root = createRoot(RootEl);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
