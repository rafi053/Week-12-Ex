import {  Request, Response } from 'express';
import { IUser } from '../types/types';
import { fetchUserData } from '../utills/userUtills';


export const massage = (req: Request, res: Response) => {
    res.status(200).json({message: "hello world"})
}

export const user = (req: Request, res: Response) => {
    const {name, id} = req.body;
    if (!name || !id) {
       res.status(400).json("name or id are required")
       return
    }
    res.status(201).json({name, id})
}

export const  userData = async(req: Request, res: Response) => {
    try{
    const {id} = req.params;
    const idNumber = Number(id)
    if (idNumber > 10) {
        res.status(400).json("id must be less than 10")
        return
    }
    
    const user: IUser | undefined = await fetchUserData(id);

    res.status(201).json({user})
    }catch (error) {
        res.status(400).json(error)
    }
}