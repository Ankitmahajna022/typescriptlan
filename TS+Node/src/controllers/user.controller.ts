import { Request,Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService()

export const getUser=(req:Request,res:Response)=>{
    const user=userService.getUser()

    res.json(user)
}