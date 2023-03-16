import mongoose, { Schema } from "mongoose";
import category from "../types/category";

const StorySchema: Schema = new Schema(
  {
    name: { type: String, unique: true, require: true },
  },
  { timestamps: true, collection: "category" }
);
export default mongoose.model<category>("category", StorySchema);
