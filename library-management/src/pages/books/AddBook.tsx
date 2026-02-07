import { useState } from "react";
import { useCreateBooks } from "../../hooks/useLibraryQueries";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../Constants/Router";

export default function AddBook() {
  const [value, setValue] = useState({
    title: "",
    author: "",
  });

  const navigate = useNavigate();
  const createBooks = useCreateBooks();

  const handleSubmit = () => {
    if (!value.title || !value.author) return;

    createBooks.mutate(
      { ...value, available: true },
      {
        onSuccess: () => navigate(ROUTE.BOOKS.LIST),
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📘 Add Book</h2>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Title"
        value={value.title}
        onChange={e =>
          setValue(prev => ({ ...prev, title: e.target.value }))
        }
      />

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Author"
        value={value.author}
        onChange={e =>
          setValue(prev => ({ ...prev, author: e.target.value }))
        }
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add Book
      </button>
    </div>
  );
}
