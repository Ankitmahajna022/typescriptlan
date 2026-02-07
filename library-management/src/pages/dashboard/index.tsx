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
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const totalBooks = books.length;
  const availableBooks = books.filter(b => b.available).length;
  const totalMembers = members.length;
  const totalIssued = issuedBooks.filter(i => !i.returnDate).length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📊 Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Books */}
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Books</p>
          <p className="text-3xl font-bold text-gray-800">
            {totalBooks}
          </p>
        </div>

        {/* Available Books */}
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Available Books</p>
          <p className="text-3xl font-bold text-gray-800">
            {availableBooks}
          </p>
        </div>

        {/* Total Members */}
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-3xl font-bold text-gray-800">
            {totalMembers}
          </p>
        </div>

        {/* Issued Books */}
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Issued Books</p>
          <p className="text-3xl font-bold text-gray-800">
            {totalIssued}
          </p>
        </div>
      </div>
    </div>
  );
}
