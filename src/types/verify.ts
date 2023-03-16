import { Document } from "mongoose";

export default interface verify extends Document {
  email: string;
  uniqueString: string;
  effectiveSeconds: number;
  createdAt: Date;
}
