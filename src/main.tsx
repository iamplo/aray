import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "secret-page",
    element: <div>Secret Page</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
