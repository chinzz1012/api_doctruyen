import mongoose, { Schema } from "mongoose";
import validator from "validator";
import user from "../types/user";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, require: true, max: 15 },
    email: {
      type: String,
      require: true,
      validate: (value: any) => {
        return validator.isEmail(value);
      },
    },
    password: { type: String, require: true, min: 3, max: 15 },
    verified: { type: Boolean, require: true, default: false },
    locked: { type: Boolean, require: true, default: false },
    role: { type: String, require: true, default: "user" },
    refreshToken: { type: String },
  },
  { timestamps: true, collection: "user" }
);
export default mongoose.model<user>("user", UserSchema);
