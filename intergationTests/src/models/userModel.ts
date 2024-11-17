import mongoose, { Document, Schema } from 'mongoose';

// ממשק המתאר את המבנה של מסמך המשתמש
export interface IUser extends Document {
  email: string;
  password: string;
  name:string
}

// הגדרת הסכמה
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, "Please add the user name"],
    unique: [true, "Email already registered"],
    match: [/^\S+@\S+\.\S+$/, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password should be at least 6 characters long"],
  },
  name:{
    type:String,
    required: [true, "Please add name"],
    minlength: [2, "Name should be at least 2 characters long"],
  }
}, {
  timestamps: true
});

// יצירת ואקספורט המודל
export default mongoose.model<IUser>('User', UserSchema);