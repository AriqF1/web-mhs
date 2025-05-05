import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import AppRoutes from "./AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="light"
    />
  </StrictMode>
);
