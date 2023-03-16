import mongoose, { Schema } from "mongoose";
import chapter from "../types/chapter";

const ChapterSchema: Schema = new Schema(
  {
    storyName: { type: String, require: true },
    chapterNumber: { type: Number, require: true },
    url: { type: Array, require: true },
    viewCount: { type: Number, require: true, default: 0 },
  },
  { timestamps: true, collection: "chapter" }
);
export default mongoose.model<chapter>("chapter", ChapterSchema);
