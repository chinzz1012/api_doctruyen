import mongoose, { Schema } from "mongoose";
import verify from "../types/verify";

const VerifySchema: Schema = new Schema(
  {
    email: { type: String, require: true },
    uniqueString: { type: String, require: true },
    effectiveSeconds: { type: Number, require: true },
    authType: { type: String, require: true },
  },
  { timestamps: true, collection: "verify" }
);
export default mongoose.model<verify>("verify", VerifySchema);
