import mongoose, { Document, Schema } from "mongoose";
import type { IWorkspace } from "@cortexiq/shared-types";

// We extend the shared interface with Mongoose Document
export interface IWorkspaceDocument extends Omit<IWorkspace, "_id">, Document {}

const workspaceSchema = new Schema<IWorkspaceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    ownerId: {
      type: String, // String representation of ObjectId or user id
      required: true,
      index: true,
    },
    members: [
      {
        userId: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes to speed up queries for user workspaces
workspaceSchema.index({ "members.userId": 1 });

const Workspace = mongoose.model<IWorkspaceDocument>("Workspace", workspaceSchema);

export default Workspace;
