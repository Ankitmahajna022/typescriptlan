import { useIssuedBooks, useReturnBook } from "../../hooks/useLibraryQueries";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function ReturnBook() {
  // ✅ correct hook
  const { data: issues = [], isLoading } = useIssuedBooks();
  const returnBookMutation = useReturnBook();

  const { books, members } = useSelector((state: RootState) => state);

  if (isLoading) return <p>Loading...</p>;

  const getBookTitle = (bookId: string) =>
    books.find(b => b.id === bookId)?.title || "Unknown";

  const getMemberName = (memberId: string) =>
    members.find(m => m.id === memberId)?.name || "Unknown";

  return (
    <div>
      <h2>📦 Return Book</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Book</th>
            <th>Member</th>
            <th>Due Date</th>
            <th>Fine</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.length === 0 && (
            <tr>
              <td colSpan={5} align="center">
                No issued books
              </td>
            </tr>
          )}

          {issues.map(issue => (
            <tr key={issue.id}>
              <td>{getBookTitle(issue.bookId)}</td>
              <td>{getMemberName(issue.memberId)}</td>
              <td>{new Date(issue.dueDate).toLocaleDateString()}</td>
              <td>₹ {issue.fine ?? 0}</td>
              <td>
                {issue.returnDate ? (
                  <span>Returned ✅</span>
                ) : (
                  <button
                    onClick={() => returnBookMutation.mutate(issue)}
                    disabled={returnBookMutation.isPending}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
