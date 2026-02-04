import  { useSelector } from "react-redux";
import type { RootState } from "../../store";


export default function  Dashboard() {
  const books=useSelector((state:RootState)=>state.books)
  const  members=useSelector((state:RootState)=>state.members)
  const issuedBooks=useSelector((state:RootState)=>state.issuedBooks)
  return (
    <div style={{ padding: 20 }}>
       <h2>Dashboard</h2>
      <p>Total Books: {books.length}</p>
      <p>Total Members: {members.length}</p>
      <p>Issued Books: {issuedBooks.length}</p>
    </div>
  )
}
