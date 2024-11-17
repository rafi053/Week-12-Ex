import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/userModel";
interface DTO {
  message: string;
  data?: any;
  success: boolean;
}
export const message = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Hello, world" });
};
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      res.status(400);
      throw new Error("You didn't provide email or password");
    }

    if(password.trim().length <6){
      throw new Error("Pass is too short")
    }
    const salt = Number(process.env.SALT);
    if (!salt) throw new Error("Cannot find SALT in ENV");
    const hashpass = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashpass,
      name,
    });
    const response: DTO = {
      message: "User created successfully",
      success: true,
      data: { _id: user._id, name: user.name },
    };
    res.status(201).json(response);
  } catch (err: any) {
    console.log(res.statusCode)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({ message: `Error occurred: ${err.message}`, success: false });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are mandatory", success: false });
        return;
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(404).json({ message: "User not found", success: false });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        const response: DTO = {
          data: { _id: user._id, name: user.name },
          message: `Welcome ${user.name}`,
          success: true,
        };
        res.status(200).json(response);
      } else {
        res.status(401).json({ message: "Invalid password", success: false });
      }
    } catch (err: any) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({ message: `Error occurred: ${err.message}`, success: false });
    }
  };

export const editName = async (req: Request, res: Response) => {
  try {
    const { _id, name } = req.body;

    if (!_id) {
      res.status(404);
      throw new Error("ID is mendatory");
    }
    if (!name) {
      res.status(400);
      throw new Error("Name must be provided");
    }
    const user = await User.findByIdAndUpdate(_id, { name }, { new: true });
    if (!user) {
      res.status(404);
      throw new Error("No such user in the Data base");
    }
    const response: DTO = {
      message: `Name was changed to: ${name}`,
      data: user,
      success: true,
    };
    
    
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (res.statusCode)
      res
        .status(res.statusCode)
        .json({ message: `Error occured: ${err.message}`, success: false });
    else
      res
        .status(500)
        .json({ message: `Error occured: ${err.message}`, success: false });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      res.status(404);
      throw new Error("ID is mendatory");
    }
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      res.status(404);
      throw new Error("No such user in the DB");
    }
    const response: DTO = {
      message: `${user.name} was deleted successfully`,
      success: true,
      data: { _id },
    };
    res.status(200).json(response);
  } catch (err: any) {
    if (res.statusCode)
      res
        .status(res.statusCode)
        .json({ message: `Error occured: ${err.message}`, success: false });
    else
      res
        .status(500)
        .json({ message: `Error occured: ${err.message}`, success: false });
  }
};
