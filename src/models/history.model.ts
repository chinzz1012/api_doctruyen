import mongoose, { Schema } from "mongoose";
import history from "../types/history";

const HistorySchema: Schema = new Schema(
  {
    username: { type: String, require: true },
    storyName: { type: String, require: true },
    currentChapter: { type: Number, require: true, default: 0 },
    liked: { type: Boolean, require: true, default: false },
    avatarStory: { type: String, require: true },
  },
  { timestamps: true, collection: "history" }
);
export default mongoose.model<history>("history", HistorySchema);
