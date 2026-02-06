import { Link } from "react-router-dom"
import { useMembers, useDeleteMembers } from "../../hooks/useLibraryQueries"

export default function Members() {
    const { data: members } = useMembers();
    const deleteMember = useDeleteMembers();


    return (

        <div>
            <Link to="/members/add">Add Member</Link>

            <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {members?.map(m => (
                        <tr key={m.id}>
                            <td>{m.name}</td>
                            <td>{m.email}</td>
                            <td>
                                <Link to={`/members/edit/${m.id}`}>Edit</Link>
                                <button onClick={() => deleteMember.mutate(m.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
