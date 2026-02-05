import { Routes,Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { PageRoutes } from "./PageRoutes";



export default function AppRouter() {
  return (
    <div>
      <Navbar />
      <Routes>
        {
          PageRoutes.map((route,index)=>(
            <Route key={index} path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </div>
  )
}
