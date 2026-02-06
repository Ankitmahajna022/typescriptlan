import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useUpdateMembers } from "../../hooks/useLibraryQueries";
import { useState } from "react";

export default function EditMember() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateMember = useUpdateMembers();

  const member = useSelector(
    (state: RootState) =>
      state.members.find(m => m.id === id)
  );

  const [name, setName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");

  if (!member) return <p>Member not found</p>;

  const submit = () => {
    updateMember.mutate(
      { id: member.id, name, email },
      {
        onSuccess: () => navigate("/members")
      }
    );
  };

  return (
    <div>
      <h2>Edit Member</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={submit}>Update</button>
    </div>
  );
}
