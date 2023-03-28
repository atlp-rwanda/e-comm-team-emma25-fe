import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const RootEl = document.querySelector("#root");
if (!RootEl) {
  throw new Error("can not find root element");
}
const root = createRoot(RootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
