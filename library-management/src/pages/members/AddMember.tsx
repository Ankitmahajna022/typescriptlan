import { useState } from "react";
import { useCreateMembers } from "../../hooks/useLibraryQueries"
import { useNavigate } from "react-router-dom";

export default function AddMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createMember = useCreateMembers();
  const navigate = useNavigate();

  const submit = () => {
    if (!name || !email) {
      alert("All fields required");
      return;
    }

    createMember.mutate(
      { name, email },
      {
        onSuccess: () => navigate("/members")
      }
    );
  };

  return (
    <div>
      <h2>Add Member</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={submit}>Add</button>
    </div>
  );
}
