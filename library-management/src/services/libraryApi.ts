import { api } from "./axios";
import type { Book, Member, IssueBook } from "../types";

// BOOK API 

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await api.get("/books");
  return res.data;
};

export const createBook = async (
  book: Omit<Book, "id">
): Promise<Book> => {
  const res = await api.post("/books", book);
  return res.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const res = await api.put(`/books/${book.id}`, book);
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};

//MEMBER API 

export const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get("/members");
  return res.data;
};

export const createMember = async (
  member: Omit<Member, "id">
): Promise<Member> => {
  const res = await api.post("/members", member);
  return res.data;
};

export const updateMember = async (member: Member): Promise<Member> => {
  const res = await api.put(`/members/${member.id}`, member);
  return res.data;
};

export const deleteMember = async (id: string): Promise<void> => {
  await api.delete(`/members/${id}`);
};

// ISSUE BOOK API 

export const fetchIssuedBooks = async (): Promise<IssueBook[]> => {
  const res = await api.get("/issuedBooks");
  return res.data;
};

export const createIssue = async (
  payload: { bookId: string; memberId: string }
): Promise<IssueBook> => {
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issueDate.getDate() + 7);

  const res = await api.post("/issuedBooks", {
    ...payload,
    issueDate: issueDate.toISOString(),
    dueDate: dueDate.toISOString(),
    fine: 0,
  });


  await api.patch(`/books/${payload.bookId}`, {
    available: false,
  });

  return res.data;
};

export const returnIssue = async (
  issue: IssueBook
): Promise<IssueBook> => {


  const res = await api.patch(`/issuedBooks/${issue.id}`, {
    returnDate: new Date().toISOString(),
  });

  await api.patch(`/books/${issue.bookId}`, {
    available: true,
  });

  return res.data;
};
