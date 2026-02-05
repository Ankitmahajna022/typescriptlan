import type { Book } from "../../types";
import { useDispatch,useSelector } from "react-redux";
import {deleteBook,updateBook,issueBook} from "../../store/library.slice"
import type { AppDispatch,RootState } from "../../store";
import { useState } from "react";

interface Prors{
    book:Book
}



export default function BookCard({book}:Prors) {    
  const dispatch=useDispatch<AppDispatch>()
  const members = useSelector((state: RootState) => state.members);

  const [isEdit,setIsEdit]=useState(false)  
  const [title,setTitle]=useState(book.title)  
  const [author,setAuthor]=useState(book.author)

  const handleDelete=()=>{
    dispatch(deleteBook({bookId:book.id}))
  }

  const handleIssue=()=>{
    if(!members.length)return alert("No members available");
    dispatch(
      issueBook({
        bookId:book.id,
        memberId:members[0].id
      })
    )
  }

  const handleUpdate=()=>{
    dispatch(updateBook({
      ...book,
      title,
      author
    }))
    setIsEdit(false);
  }



  return (
    <div style={{border:"1px solid #ccc",padding:10,marginBottom:10}}>
      {isEdit?(
        <>
            <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            style={{ marginLeft: 8 }}
          />
          <button onClick={handleUpdate} style={{ marginLeft: 8 }}>
            Save
          </button>
          <button onClick={() => setIsEdit(false)} style={{ marginLeft: 4 }}>
            Cancel
          </button>
        </>
      ):(
        <>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </>
      )}

      <p>Status: {book.available ? "Available ✅" : "Issued ❌"}</p>

      
      {!isEdit && (
        <>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: 6 }}>
            Delete
          </button>

          {book.available && (
            <button onClick={handleIssue} style={{ marginLeft: 6 }}>
              Issue Book
            </button>
          )}
        </>
      )}
       
    </div>
  )
}




