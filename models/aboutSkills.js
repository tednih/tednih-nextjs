import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skills ||
  mongoose.model("Skills", SkillsSchema, "about.skills");
