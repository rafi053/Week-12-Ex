import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENVIORMENT === "production" ?  ".env":".env.test"
});
const JWT_SECRET:string = process.env.JWT_SECRET as string;



const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
  
  const token = req.cookies.token
  if (!token) {
     res.status(401).json({ message: 'Access token missing' });
     return
  }

  try {
    const decoded:{  _id:string } = jwt.verify(token, JWT_SECRET) as {  _id:string };
    if(!decoded) res.status(403).json({ message: 'Invalid token' });

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
