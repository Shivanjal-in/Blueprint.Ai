import mongoose, { Schema, Document } from "mongoose";

export interface Token extends Document {
  owner: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const TokenSchema: Schema<Token> = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // this should be "User" to reference the User model
    required: [true, "owner is required"],
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600, // 1 hour
    default: Date.now,
  },
});

// Checking if db already exists or not and it should be of type Token
const TokenModel =
  (mongoose.models.Token as mongoose.Model<Token>) ||
  mongoose.model<Token>("Token", TokenSchema);

export default TokenModel;
