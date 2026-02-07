import { NavLink, Outlet } from "react-router-dom";
import { ROUTE } from "../../Constants/Router";

const links = [
  { to: ROUTE.DASHBOARD, label: "Dashboard" },
  { to: ROUTE.BOOKS.LIST, label: "Books" },
  { to: ROUTE.MEMBERS.LIST, label: "Members" },
  { to: ROUTE.ISSUEBOOKS.ISSUE, label: "Issue" },
  { to: ROUTE.RETURNBOOK.RETURN, label: "Return" },
];

export default function Navbar() {
  return (
    <>
    <nav className="bg-gray-900 px-7 py-4 flex gap-4">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
         className={({ isActive }) =>
            `px-3 py-1 rounded text-white transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
        >
          {link.label}
        </NavLink>
  
      ))}
     
    </nav>

    <Outlet/>
    </>
  );
}
