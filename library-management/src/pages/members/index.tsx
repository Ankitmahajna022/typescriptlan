import { Link } from "react-router-dom";
import { useMembers, useDeleteMembers } from "../../hooks/useLibraryQueries";
import { ROUTE } from "../../Constants/Router";

export default function Members() {
  const { data: members, isLoading } = useMembers();
  const deleteMember = useDeleteMembers();

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Members</h2>
        <Link
          to={ROUTE.MEMBERS.ADD}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Member
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Email</th>
              <th className="text-left px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {members?.map((m) => (
              <tr key={m.id} className="hover:bg-gray-600 ">
                <td className="px-4 py-2 border">{m.name}</td>
                <td className="px-4 py-2 border">{m.email}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link
                    to={ROUTE.MEMBERS.EDIT + m.id}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteMember.mutate(m.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {members?.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
