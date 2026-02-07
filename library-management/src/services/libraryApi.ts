import { api } from "./axios";
import type { Book, Member, IssueBook } from "../types";
import { KEYS } from "../Constants/libraryUrlKeys";

/* =======================
   BOOK API
======================= */

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await api.get(KEYS.BOOKS.BOOKS);
  return res.data;
};

export const createBook = async (
  book: Omit<Book, "id">
): Promise<Book> => {
  const res = await api.post(KEYS.BOOKS.BOOKS, book);
  return res.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const res = await api.put(
    `${KEYS.BOOKS.BOOKS}/${book.id}`,
    book
  );
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`${KEYS.BOOKS.BOOKS}/${id}`);
};

/* =======================
   MEMBER API
======================= */

export const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get(KEYS.MEMBERS.MEMBERS);
  return res.data;
};

export const createMember = async (
  member: Omit<Member, "id">
): Promise<Member> => {
  const res = await api.post(KEYS.MEMBERS.MEMBERS, member);
  return res.data;
};

export const updateMember = async (member: Member): Promise<Member> => {
  const res = await api.put(
    `${KEYS.MEMBERS.MEMBERS}/${member.id}`,
    member
  );
  return res.data;
};

export const deleteMember = async (id: string): Promise<void> => {
  await api.delete(`${KEYS.MEMBERS.MEMBERS}/${id}`);
};

/* =======================
   ISSUE BOOK API
======================= */

export const fetchIssuedBooks = async (): Promise<IssueBook[]> => {
  const res = await api.get(KEYS.ISSUED_BOOKS.ISSUED);
  return res.data;
};

export const createIssue = async (
  payload: { bookId: string; memberId: string }
): Promise<IssueBook> => {
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issueDate.getDate() + 7);

  const res = await api.post(KEYS.ISSUED_BOOKS.ISSUED, {
    ...payload,
    issueDate: issueDate.toISOString(),
    dueDate: dueDate.toISOString(),
    fine: 0,
  });

  // mark book as unavailable
  await api.patch(
    `${KEYS.BOOKS.BOOKS}/${payload.bookId}`,
    { available: false }
  );

  return res.data;
};

export const returnIssue = async (
  issue: IssueBook
): Promise<IssueBook> => {
  const res = await api.patch(
    `${KEYS.ISSUED_BOOKS.ISSUED}/${issue.id}`,
    { returnDate: new Date().toISOString() }
  );

  await api.patch(
    `${KEYS.BOOKS.BOOKS}/${issue.bookId}`,
    { available: true }
  );

  return res.data;
};
