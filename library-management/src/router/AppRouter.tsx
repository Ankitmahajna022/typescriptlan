import { Routes,Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Dashboard from "../pages/dashboard";
import Members from "../pages/members";
import Books from "../pages/books";
import ReturnBook from "../pages/return-book";
import IssueBook from "../pages/issue-book";


export default function AppRouter() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/issue-book" element={<IssueBook />} />
        <Route path="/return-book" element={<ReturnBook />} />
      </Routes>
    </div>
  )
}
