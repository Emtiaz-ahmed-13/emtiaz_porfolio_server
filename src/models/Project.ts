import { Schema, model } from "mongoose";
import { IProject } from "../Interface/Project.interface";

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String },
    repoUrl: { type: String },
    liveUrl: { type: String },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IProject>("Project", ProjectSchema);
