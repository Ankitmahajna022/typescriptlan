import { useState } from "react";
import { useIssueBook, useBooks, useMembers } from "../../hooks/useLibraryQueries";

export default function IssueBook() {
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: members = [], isLoading: membersLoading } = useMembers();
  const issueBookMutation = useIssueBook();

  const [selectedMember, setSelectedMember] = useState("");

  const issue = (bookId: string) => {
    if (!selectedMember) {
      alert("Please select member");
      return;
    }

    issueBookMutation.mutate({
      bookId,
      memberId: selectedMember,
    });
  };

  const availableBooks = books.filter(b => b.available);

  if (booksLoading || membersLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📚 Issue Book</h2>

      {/* Member Select */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Member</label>
        <select
          value={selectedMember}
          onChange={e => setSelectedMember(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Member</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <hr className="mb-6" />

      {availableBooks.length === 0 ? (
        <p className="text-gray-500">No books available for issue.</p>
      ) : (
        <div className="space-y-3">
          {availableBooks.map(book => (
            <div
              key={book.id}
              className="flex justify-between items-center border p-3 rounded hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>

              <button
                onClick={() => issue(book.id)}
                disabled={issueBookMutation.isPending}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Issue
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
