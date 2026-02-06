import { useState } from "react";
import { useIssueBook, useBooks, useMembers } from "../../hooks/useLibraryQueries";

export default function IssueBook() {
  const { data: books = [] } = useBooks();
  const { data: members = [] } = useMembers();
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

  return (
    <div>
      <h2>📚 Issue Book</h2>

      {/* Member Select */}
      <select
        value={selectedMember}
        onChange={e => setSelectedMember(e.target.value)}
      >
        <option value="">Select Member</option>
        {members.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <hr />

      {availableBooks.length === 0 && <p>No books available</p>}

      {availableBooks.map(book => (
        <div key={book.id} style={{ marginBottom: 10 }}>
          <strong>{book.title}</strong>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => issue(book.id)}
          >
            Issue
          </button>
        </div>
      ))}
    </div>
  );
}
