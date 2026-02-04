import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import BookCard from "../../components/book/BookCard"

export default function Books() {
 
    const books=useSelector((state:RootState)=>state.books)

  return (
    <div style={{ padding: 20 }}>
      <h2>Books</h2>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
