import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { EasyLevelProvider } from "./context/EasyLevelContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EasyLevelProvider>
      <RouterProvider router={router}></RouterProvider>
    </EasyLevelProvider>
  </React.StrictMode>,
);
