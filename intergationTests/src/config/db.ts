import mongoose from "mongoose";

export async function connectDB():Promise<void> {
    try{
    const uri:string|undefined = process.env.MONGO_URI;
    if (!uri)
        throw new Error("Cannot find MONGO_URI in ENV");
    const connection = await mongoose.connect(uri)
    console.log("Connected to MongoDB",connection.connection.host)
}catch(err:any)
{
    console.error("Cannot connect to Mongo ",err.message);
}  
 }