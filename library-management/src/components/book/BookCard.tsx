import type { Book } from "../../types";

interface Prors{
    book:Book
}



export default function BookCard({book}:Prors) {    
  return (
    <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>Status: {book.available ? "Available ✅" : "Issued ❌"}</p>
    </div>
  )
}




