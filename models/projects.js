import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    judul: String,
    tanggal: Date,
    foto: [String],
    link: String,
    bahasa: [String],
    tools: [String],
    deskripsi: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.project ||
  mongoose.model("project", ProjectSchema);
