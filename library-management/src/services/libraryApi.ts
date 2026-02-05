import { api } from "./axios"
import type { Book, Member, IssueBook } from "../types"

// Book API

export const fetchBook = async (): Promise<Book[]> => {
    const res = await api.get("/books");

    return res.data
}

export const createBook = async (book: Book): Promise<Book> => {
    const res = await api.post("/books", book);

    return res.data

}

export const updateBook = async (book: Book): Promise<Book> => {
    const res = await api.put(`/books/${book.id}`, book);

    return res.data;
}

export const deleteBook = async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);

}

// Member

export const fetchMembar = async (): Promise<Member[]> => {
    const res = await api.get("/members");

    return res.data
}

export const createMembar = async (membaer: Member): Promise<Member> => {
    const res = await api.post("/members", membaer);

    return res.data
}

export const updateMember = async (member: Member): Promise<Member> => {
    const res = await api.put(`/members/${member.id}`, member);

    return res.data
}

export const deleteMember = async (id: string): Promise<void> => {
    await api.delete(`/members/${id}`);
}

//IssueBook

export const fetchIssuedBooks = async (): Promise<IssueBook[]> => {
    const res = await api.get("/issuedBooks");
    return res.data;
};

export const createIssue = async (
    issueBook: IssueBook
): Promise<IssueBook> => {
    const res = await api.post("/issuedBooks", issueBook);
    return res.data;
};

export const updateIssue = async (issueBook: IssueBook): Promise<IssueBook> => {
    const res = await api.put(`/issuedBooks${issueBook.id}`, issueBook);
    return res.data
}