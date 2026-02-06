import { api } from "./axios";
import type { Book, Member, IssueBook } from "../types";
import { LIBRARY_URL_KEYS } from "../Constants/libraryUrlKeys";

// BOOK API 

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await api.get(LIBRARY_URL_KEYS.BOOKS.ALL);
  return res.data;
};

export const createBook = async (
  book: Omit<Book, "id">
): Promise<Book> => {
  const res = await api.post(LIBRARY_URL_KEYS.BOOKS.ADD, book);
  return res.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const res = await api.put(
    LIBRARY_URL_KEYS.BOOKS.UPDATE + book.id,
    book
  );
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(LIBRARY_URL_KEYS.BOOKS.DELETE + id);
};


// MEMBER API

export const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get(LIBRARY_URL_KEYS.MEMBERS.ALL);
  return res.data;
};

export const createMember = async (
  member: Omit<Member, "id">
): Promise<Member> => {
  const res = await api.post(LIBRARY_URL_KEYS.MEMBERS.ADD, member);
  return res.data;
};

export const updateMember = async (member: Member): Promise<Member> => {
  const res = await api.put(
    LIBRARY_URL_KEYS.MEMBERS.UPDATE + member.id,
    member
  );
  return res.data;
};

export const deleteMember = async (id: string): Promise<void> => {
  await api.delete(LIBRARY_URL_KEYS.MEMBERS.DELETE + id);
};


// ISSUE BOOK API 

export const fetchIssuedBooks = async (): Promise<IssueBook[]> => {
  const res = await api.get(LIBRARY_URL_KEYS.ISSUED_BOOKS.ALL);
  return res.data;
};

export const createIssue = async (
  payload: { bookId: string; memberId: string }
): Promise<IssueBook> => {
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issueDate.getDate() + 7);

  const res = await api.post(LIBRARY_URL_KEYS.ISSUED_BOOKS.ISSUE, {
    ...payload,
    issueDate: issueDate.toISOString(),
    dueDate: dueDate.toISOString(),
    fine: 0,
  });


  await api.patch(
    LIBRARY_URL_KEYS.BOOKS.UPDATE + payload.bookId,
    { available: false }
  );

  return res.data;
};

export const returnIssue = async (
  issue: IssueBook
): Promise<IssueBook> => {
  const res = await api.patch(
    LIBRARY_URL_KEYS.ISSUED_BOOKS.RETURN + issue.id,
    { returnDate: new Date().toISOString() }
  );

  await api.patch(
    LIBRARY_URL_KEYS.BOOKS.UPDATE + issue.bookId,
    { available: true }
  );

  return res.data;
};
