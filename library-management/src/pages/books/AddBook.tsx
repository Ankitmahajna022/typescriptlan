import { useState } from "react";
import { useCreateBooks } from "../../hooks/useLibraryQueries";
import { useNavigate } from "react-router-dom";

export default function AddBook() {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const navigate = useNavigate()
    const createBooks = useCreateBooks()

    const handleSubmti = () => {
        createBooks.mutate(
            {
                title, author, available: true
            },
            { onSuccess: () => navigate("/books") }
        )
    }

    return (
        <div>
            <h2>Add Book</h2>
            <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <input placeholder="Author" onChange={e => setAuthor(e.target.value)} />
            <button onClick={handleSubmti}>Add</button>
        </div>
    )
}