import {useBooks,usedeleteBooks} from "../../hooks/useLibraryQueries"
import { Link } from "react-router-dom"


export default function BooksPage(){
    const  {data:books,isLoading}=useBooks()
    const deleteBook=usedeleteBooks()
    


     if (isLoading) return <p>Loading books...</p>;


    return(
        <div>
            <h2>Books</h2>
            <Link to="/books/add">Add Book</Link>

            <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>    
         <tbody>
          {books?.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.available ? "Available" : "Issued"}</td>
              <td>
                <Link to={`/books/edit/${book.id}`}>Edit</Link>
                <button  style={{marginLeft:5}}onClick={() => deleteBook.mutate(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            
        </div>
    )
}