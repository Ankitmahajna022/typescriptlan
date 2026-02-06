import { NavLink } from "react-router-dom";
import { ROUTE } from "../../Constants/Router";


export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <NavLink to={ROUTE.DASHBOARD} style={{ color: "#fff", marginRight: 15 }}>Dashboard</NavLink>
      <NavLink to={ROUTE.BOOKS.LIST} style={{ color: "#fff", marginRight: 15 }}>Books</NavLink>
      <NavLink to={ROUTE.MEMBERS.LIST} style={{ color: "#fff", marginRight: 15 }}>Members</NavLink>
      <NavLink to={ROUTE.ISSUEBOOKS.ISSUE} style={{ color: "#fff", marginRight: 15 }}>Issue</NavLink>
      <NavLink to={ROUTE.RETURNBOOK.RETURN} style={{ color: "#fff" }}>Return</NavLink>
    </nav>
  )
}
