import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    judul: String,
    tanggal: Date,
    foto: [String],
    deskripsi: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.blog || mongoose.model("blog", BlogSchema);
