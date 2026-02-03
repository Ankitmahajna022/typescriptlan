import UserCarad from "../components/UserCard";
import type { User } from "../interfaces/User";

const Home=()=>{
    const users:User[]=[
        { id: 1, name: "Ankit", email: "ankit@gmail.com" },
        { id: 2, name: "Rahul", email: "rahul@gmail.com" },
        {id:3,name:"Raj",email:"raj@gmail.com"}
    ]

    return(
        <div>
            <h2>User List</h2>
            {
                users.map(user=>(
                    <UserCarad key={user.id} user={user}/>
                ))
            }
        </div>
    )
}

export default  Home