import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AboutProfileSchema = new mongoose.Schema(
  {
    nama: String,
    deskripsi: String,
    foto: String,
    username: {
      type: String,
      required: true,
      unique: true, // biar tidak ada username ganda
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// hash password sebelum disimpan
AboutProfileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // kalau password tidak diubah, skip

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Cegah OverwriteModelError
export default mongoose.models.aboutProfile ||
  mongoose.model("aboutProfile", AboutProfileSchema, "about.profiles");
