import { Document } from "mongoose";

export default interface story extends Document {
  name: string;
  creator: string;
  avatar: string;
  describe: string;
  finished: boolean;
  viewCount: number;
  likeCount: number;
  category: string[];
}
