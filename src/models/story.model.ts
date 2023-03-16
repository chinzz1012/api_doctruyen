import mongoose, { Schema } from "mongoose";
import story from "../types/story";

const StorySchema: Schema = new Schema(
  {
    name: { type: String, unique: true, require: true },
    creator: { type: String, require: true },
    describe: { type: String, require: true },
    avatar: { type: String, require: true },
    finished: { type: Boolean, require: true },
    viewCount: { type: Number, require: true, default: 0 },
    likeCount: { type: Number, require: true, default: 0 },
    category: { type: Array, require: true },
  },
  { timestamps: true, collection: "story" }
);
export default mongoose.model<story>("story", StorySchema);
