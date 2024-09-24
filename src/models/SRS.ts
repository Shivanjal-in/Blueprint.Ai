import mongoose, { Schema, Document } from "mongoose";

export interface SRS extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  description: string[];
  status: string;
  rating: number;
  praise: string[];
  pdf_url: string;
  word_url: string;
  createdAt: Date;
}

const SRSSchema: Schema<SRS> = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // this should be "User" to reference the User model
    required: [true, "owner is required"],
  },
  name: {
    type: String,
  },
  description: {
    type: [String],
  },
  status: {
    type: String,
    required: true,
    default:"Generating"
  },
  rating: {
    type: Number,
    default:5,
  },
  praise: {
    type: [String],
  },
  pdf_url: {
    type: String,
  },
  word_url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SRSModel =
  (mongoose.models.SRS as mongoose.Model<SRS>) ||
  mongoose.model<SRS>("SRS", SRSSchema);

export default SRSModel;
