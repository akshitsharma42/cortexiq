import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  plan: "guest" | "free" | "pro" | "enterprise";
  usage: {
    messagesToday: number;
    lastResetDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Never return password by default
    },
    plan: {
      type: String,
      enum: ["guest", "free", "pro", "enterprise"],
      default: "free",
    },
    usage: {
      messagesToday: { type: Number, default: 0 },
      lastResetDate: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
