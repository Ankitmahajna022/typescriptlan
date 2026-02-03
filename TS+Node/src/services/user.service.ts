import {User} from "../interfaces/user.interface"


 export class UserService{
    getUser():User{
        return{
           email:"ankit@gmail.com",
            name:"Ankit",
            id:1
        }
    }
 }