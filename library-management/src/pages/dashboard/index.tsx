import {
  useBooks,
  useMembers,
  useIssuedBooks
} from "../../hooks/useLibraryQueries";

export default function Dashboard() {
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: members = [], isLoading: membersLoading } = useMembers();
  const { data: issuedBooks = [], isLoading: issuedLoading } =
    useIssuedBooks();

  if (booksLoading || membersLoading || issuedLoading) {
    return <h3>Loading dashboard...</h3>;
  }

  const totalBooks = books.length;
  const availableBooks = books.filter(b => b.available).length;
  const totalMembers = members.length;
  const totalIssued = issuedBooks.filter(i => !i.returnDate).length;

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Dashboard</h2>

      <ul>
        <li>Total Books: <strong>{totalBooks}</strong></li>
        <li>Available Books: <strong>{availableBooks}</strong></li>
        <li>Total Members: <strong>{totalMembers}</strong></li>
        <li>Issued Books: <strong>{totalIssued}</strong></li>
      </ul>
    </div>
  );
}
