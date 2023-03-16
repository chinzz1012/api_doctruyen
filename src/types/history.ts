import { Document } from "mongoose";

export default interface history extends Document {
  username: string;
  storyName: string;
  currentChapter?: number;
  liked?: boolean;
  avatarStory?: string;
}
