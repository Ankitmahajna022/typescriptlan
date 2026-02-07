import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useUpdateBooks } from "../../hooks/useLibraryQueries";
import { useState } from "react";
import { ROUTE } from "../../Constants/Router";

export default function EditBook() {
  const { id } = useParams<{ id: string }>(); // ✅ FIX
  const navigate = useNavigate();
  const updateBook = useUpdateBooks();

  const book = useSelector((state: RootState) =>
    state.books.find((b) => b.id === id)
  );

  const [value, setValue] = useState({
    title: book?.title || "",
    author: book?.author || "",
  });

  if (!book) return <p>Book not found</p>;

  const handleEdit = () => {
    updateBook.mutate(
      { ...book, ...value },
      {
        onSuccess: () => navigate(ROUTE.BOOKS.LIST),
      }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>

      <input
        className="border p-2 mb-2 block"
        value={value.title}
        onChange={(e) => setValue({ ...value, title: e.target.value })}
        placeholder="Title"
      />

      <input
        className="border p-2 mb-2 block"
        value={value.author}
        onChange={(e) => setValue({ ...value, author: e.target.value })}
        placeholder="Author"
      />

      <button
        onClick={handleEdit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
