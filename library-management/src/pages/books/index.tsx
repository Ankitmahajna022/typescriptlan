import { ROUTE } from "../../Constants/Router";
import { useBooks, usedeleteBooks } from "../../hooks/useLibraryQueries"
import { Link } from "react-router-dom"


export default function BooksPage() {
  const { data: books=[], isLoading } = useBooks()
  const deleteBook = usedeleteBooks()



  if (isLoading) return <div className="flex justify-center itmes-center h-40 text-gray-500">Loading books...</div>;


  return (
    <div className="p-6">
      <div className="flex justify-between itmes-center m-4">
        <h2 className="text-3xl font-bold">Books</h2>
        <Link to={ROUTE.BOOKS.ADD} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Book</Link>
      </div>

       {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (<div className="overflow-x-auto">
        <table className="min w-full border border-gray-450 rounded">
          <thead className="bg-gray-500">
            <tr>
              <th className="text-left px-4 py-2 border">Title</th>
              <th className="text-left px-4 py-2 border">Author</th>
              <th className="text-left px-4 py-2 border">Status</th>
              <th className="text-left px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map(book => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">
                      <span
                      className={`px-2 py-1 rounded text-sm ${
                        book.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.available ? "Available" : "Issued"}
                    </span>
                    </td>
                <td className="px-4 py-2 border space-x-2">
                  <Link to={ROUTE.BOOKS.EDIT+book.id}
                   className="text-blue-600 hover:underline"
                  >Edit</Link>
                  <button  className="text-red-600 hover:underline" onClick={() => deleteBook.mutate(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}