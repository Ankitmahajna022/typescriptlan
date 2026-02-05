import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store"
import BookCard from "../../components/book/BookCard"
import { addBook } from "../../store/library.slice"
import { useState } from "react"

export default function Books() {
  const dispatch=useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.books)

  const [title,setTitle]=useState("")
  const [author,setAuthor]=useState("")

  const handleAdd=()=>{
    dispatch(
      addBook({
        title,
        author,
        available:true
      })
    )
    setTitle("")
    setAuthor("")
  }

  return (
    <div style={{padding:20}}>
      <h2>Books</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{ marginLeft: 10 }}
        />
        <button onClick={handleAdd} style={{ marginLeft: 10 }}>
          Add Book
        </button>
      </div>

      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>

  )
}
