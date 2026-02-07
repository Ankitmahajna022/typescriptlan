import { RouterProvider } from "react-router-dom"; 
import { Router } from "./router/AppRouter";
import "./App.css"
export default function App() {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}
