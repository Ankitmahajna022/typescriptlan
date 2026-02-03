import type {User }from "../interfaces/User"

interface UserData {
    user:User;
}

const UserCard=({user}:UserData)=>{
    return(
        <div style={{border:"1px solid #ccc",padding:"12px",margin:"12px"}}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>
    )
}

export default UserCard