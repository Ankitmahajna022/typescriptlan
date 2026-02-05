import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function Members() {
    const members = useSelector((state: RootState) => state.members)


    return (

        <div style={{ padding: 20 }}>
            <h2>Members</h2>
            {members.map(member => (
                <div key={member.id}>
                    <p>{member.name} - {member.email}</p>
                </div>
            ))}
        </div>
    )
}
