import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { PageRoutes } from "./PageRoutes";

export const Router = createBrowserRouter([
  {
    element: <Navbar />,
    children: PageRoutes
  },
]);
