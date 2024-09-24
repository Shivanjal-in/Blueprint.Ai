import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  date: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    // required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"], //Matching with regex when saving to db
  },
  password: {
    type: String,
    minLength: 7,
    maxLength:1024,
    // required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    // required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//! Restart the server always after making changes in model, this pre-save double hashes the password resulting in bcrypt.compare failure
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const hash = await bcrypt.hash(this.password, 10);
//     console.log("P3",hash);
    
//     this.password = hash;
//   }
//   next();
// });


//Checking if db already exists or not and it should be of type User
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;

// const user = mongoose.model("User", UserSchema);
// module.exports = user;
