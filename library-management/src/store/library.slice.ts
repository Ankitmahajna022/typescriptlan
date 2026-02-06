import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, IssueBook, Member } from "../types";


interface LibraryState {
  books: Book[];
  issuedBooks: IssueBook[];
  members: Member[];
}

const initialState: LibraryState = {
  books: [],
  issuedBooks: [],
  members: []
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {


    //set api 
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },

    setMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload;
    },

    setIssuedBooks(state, action: PayloadAction<IssueBook[]>) {
      state.issuedBooks = action.payload;
    },


    addBook(state, action: PayloadAction<Omit<Book, "id">>) {
      state.books.push({
        id: crypto.randomUUID(),
        ...action.payload
      });
    },

    updateBooks(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },

    deleteBooks(state, action: PayloadAction<string>) {
      state.books = state.books.filter(
        b => b.id !== action.payload
      );

      state.issuedBooks = state.issuedBooks.filter(
        i => i.bookId !== action.payload
      );
    },



    addMember(state, action: PayloadAction<Omit<Member, "id">>) {
      state.members.push({
        id: crypto.randomUUID(),
        ...action.payload
      });
    },

    updateMembers(state, action: PayloadAction<Member>) {
      const index = state.members.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },

    deleteMembers(state, action: PayloadAction<string>) {
      state.members = state.members.filter(
        m => m.id !== action.payload
      );

      state.issuedBooks = state.issuedBooks.filter(
        i => i.memberId !== action.payload
      );
    },




    issueBook(
      state,
      action: PayloadAction<{ bookId: string; memberId: string }>
    ) {
      const book = state.books.find(b => b.id === action.payload.bookId);
      if (!book || !book.available) return;

      state.issuedBooks.push({
        id: crypto.randomUUID(),
        bookId: action.payload.bookId,
        memberId: action.payload.memberId,
        issueDate: new Date().getDate(),
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        fine: 0
      });

      book.available = false;
    },

    returnBook(state, action: PayloadAction<string>) {
      const issueIndex = state.issuedBooks.findIndex(
        i => i.id === action.payload
      );

      if (issueIndex === -1) return;

      const issue = state.issuedBooks[issueIndex];

      const today = new Date();
      const dueDate = new Date(issue.dueDate);


      if (today > dueDate) {
        const diffDays = Math.ceil(
          (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        issue.fine = diffDays * 10;
      }

      const book = state.books.find(b => b.id === issue.bookId);
      if (book) book.available = true;


      state.issuedBooks.splice(issueIndex, 1);
    }

  }
});

export const {
  setBooks,
  setIssuedBooks,
  setMembers,
  addBook,
  updateBooks,
  deleteBooks,
  addMember,
  updateMembers,
  deleteMembers,
  issueBook,
  returnBook
} = librarySlice.actions;

export default librarySlice.reducer;
