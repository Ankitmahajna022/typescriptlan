import { useState } from "react";
import { useCreateMembers } from "../../hooks/useLibraryQueries";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../Constants/Router";

export default function AddMember() {
  const [value, setValue] = useState({ name: "", email: "" });

  const createMember = useCreateMembers();
  const navigate = useNavigate();

  const submit = () => {
    if (!value.name || !value.email) {
      alert("All fields required");
      return;
    }

    createMember.mutate(value, {
      onSuccess: () => navigate(ROUTE.MEMBERS.LIST),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        👤 Add Member
      </h2>

      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={value.name}
          onChange={e =>
            setValue({ ...value, name: e.target.value })
          }
        />

        <input
          type="email"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={value.email}
          onChange={e =>
            setValue({ ...value, email: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Member
        </button>
      </div>
    </div>
  );
}
