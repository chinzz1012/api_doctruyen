import { Document } from "mongoose";

export default interface chapter extends Document {
  storyName: string;
  chapterNumber: number;
  url: string[];
  viewCount: number;
}
