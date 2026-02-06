import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useUpdateBooks } from "../../hooks/useLibraryQueries";
import { useState } from "react";

export default function EditBook() {

    const { id } = useParams();
    const book = useSelector((state: RootState) => state.books.find(b => b.id == id));

    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(book?.author || "");
    const updateBook = useUpdateBooks();
    const navigate = useNavigate();

    if (!book) return <p>Book not found</p>;

    const handleEdit = () => {
        updateBook.mutate(
            { ...book, title, author },
            { onSuccess: () => navigate("/books") }
        );
    }

    return (
        <div>

            <h2>Edit Book</h2>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <input value={author} onChange={e => setAuthor(e.target.value)} />
            <button onClick={handleEdit}>Update</button>
        </div>
    )
}
