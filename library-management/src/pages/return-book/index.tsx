import { useIssuedBooks, useReturnBook } from "../../hooks/useLibraryQueries";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function ReturnBook() {
  const { data: issues = [], isLoading } = useIssuedBooks();
  const returnBookMutation = useReturnBook();

  const books = useSelector((state: RootState) => state.books);
  const members = useSelector((state: RootState) => state.members);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading issued books...
      </div>
    );
  }

  const getBookTitle = (bookId: string) =>
    books.find(b => b.id === bookId)?.title || "Unknown";

  const getMemberName = (memberId: string) =>
    members.find(m => m.id === memberId)?.name || "Unknown";

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📦 Return Book</h2>

      {issues.length === 0 ? (
        <p className="text-gray-500">No issued books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">Book</th>
                <th className="px-4 py-2 text-left border">Member</th>
                <th className="px-4 py-2 text-left border">Due Date</th>
                <th className="px-4 py-2 text-left border">Fine</th>
                <th className="px-4 py-2 text-left border">Action</th>
              </tr>
            </thead>

            <tbody>
              {issues.map(issue => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {getBookTitle(issue.bookId)}
                  </td>
                  <td className="px-4 py-2 border">
                    {getMemberName(issue.memberId)}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(issue.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    ₹ {issue.fine ?? 0}
                  </td>
                  <td className="px-4 py-2 border">
                    {issue.returnDate ? (
                      <span className="text-green-600 font-medium">
                        Returned ✅
                      </span>
                    ) : (
                      <button
                        onClick={() => returnBookMutation.mutate(issue)}
                        disabled={returnBookMutation.isPending}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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
      )}
    </div>
  );
}
