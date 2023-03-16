import { Document } from "mongoose";

export default interface user extends Document {
  username: string;
  email: string;
  password: string;
  verified: boolean;
  locked: boolean;
  role: string;
  refreshToken: string;
}
