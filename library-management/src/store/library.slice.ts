import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, IssueBook, Member } from "../types";

const FINE_PER_DAY = 10;

interface LibraryState {
  books: Book[];
  issuedBooks: IssueBook[];
  members: Member[];
}

const initialState: LibraryState = {
  books: [
    { id: "1", title: "Clean Code", author: "Robert Martin", available: true },
    { id: "2", title: "You Don't Know JS", author: "Kyle Simpson", available: true }
  ],
  issuedBooks: [],
  members: [{ id: "m1", name: "Ankit", email: "ankit@gmail.com" }]
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {


    addBook(state, action: PayloadAction<Omit<Book, "id">>) {
      state.books.push({
        id: crypto.randomUUID(),
        ...action.payload
      });
    },

    updateBook(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },

    deleteBook(state, action: PayloadAction<{ bookId: string }>) {
      state.books = state.books.filter(b => b.id !== action.payload.bookId);
      state.issuedBooks = state.issuedBooks.filter(
        i => i.bookId !== action.payload.bookId
      );
    },



    addMember(state, action: PayloadAction<Omit<Member, "id">>) {
      state.members.push({
        id: crypto.randomUUID(),
        ...action.payload
      });
    },

    updateMember(state, action: PayloadAction<Member>) {
      const index = state.members.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },

    deleteMember(state, action: PayloadAction<{ memberId: string }>) {
      state.members = state.members.filter(
        m => m.id !== action.payload.memberId
      );
      state.issuedBooks = state.issuedBooks.filter(
        i => i.memberId !== action.payload.memberId
      );
    },



    issueBook(
      state,
      action: PayloadAction<{ bookId: string; memberId: string }>
    ) {
      const book = state.books.find(b => b.id === action.payload.bookId);
      if (!book || !book.available) return;

      const memberExists = state.members.some(
        m => m.id === action.payload.memberId
      );
      if (!memberExists) return;

      const issueDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(issueDate.getDate() + 7);

      state.issuedBooks.push({
        id: crypto.randomUUID(),
        bookId: action.payload.bookId,
        memberId: action.payload.memberId,
        issueDate: issueDate.toISOString(),
        dueDate: dueDate.toISOString(),
        fine: 0
      });

      book.available = false;
    },

    returnBook(state, action: PayloadAction<{ issueId: string }>) {
      const issue = state.issuedBooks.find(i => i.id === action.payload.issueId);
      if (!issue) return;

      const today = new Date();
      const due = new Date(issue.dueDate);

      if (today > due) {
        const diffDays = Math.ceil(
          (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
        );
        issue.fine = diffDays * FINE_PER_DAY;
      }

      issue.returnDate = today.toISOString();

      const book = state.books.find(b => b.id === issue.bookId);
      if (book) book.available = true;
    }
  }
});

export const {
  addBook,
  updateBook,
  deleteBook,
  addMember,
  updateMember,
  deleteMember,
  issueBook,
  returnBook
} = librarySlice.actions;

export default librarySlice.reducer;
