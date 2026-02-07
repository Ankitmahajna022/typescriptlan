import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useUpdateMembers } from "../../hooks/useLibraryQueries";
import { useState } from "react";
import { ROUTE } from "../../Constants/Router";

export default function EditMember() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateMember = useUpdateMembers();

  const member = useSelector(
    (state: RootState) =>
      state.members.find(m => m.id === id)
  );

  const [value, setValue] = useState({ name: member?.name || "",email: member?.email || ""});

  if (!member) return <p>Member not found</p>;

  const submit = () => {
    updateMember.mutate(
      { id: member.id, ...value },
      {
        onSuccess: () => navigate(ROUTE.MEMBERS.LIST)
      }
    );
  };

  return (
    <div>
      <h2>Edit Member</h2>

      <input
        value={value.name}
        onChange={e => setValue({...value,name:e.target.value})}
      />

      <input
        value={value.email}
        onChange={e => setValue({...value, email: e.target.value})}
      />

      <button onClick={submit}>Update</button>
    </div>
  );
}
