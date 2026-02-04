import { NavLink } from "react-router-dom";


export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <NavLink to="/" style={{ color: "#fff", marginRight: 15 }}>Dashboard</NavLink>
      <NavLink to="/books" style={{ color: "#fff", marginRight: 15 }}>Books</NavLink>
      <NavLink to="/members" style={{ color: "#fff", marginRight: 15 }}>Members</NavLink>
      <NavLink to="/issue-book" style={{ color: "#fff", marginRight: 15 }}>Issue</NavLink>
      <NavLink to="/return-book" style={{ color: "#fff" }}>Return</NavLink>
    </nav>
  )
}
