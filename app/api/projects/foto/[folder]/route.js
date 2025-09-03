import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  const folder = params.folder;

  try {
    // 🔍 Cloudinary Search API
    const result = await cloudinary.v2.search
      .expression(`public_id:${folder}*`) // cari public_id yang diawali nama folder
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute();

    // 💡 Filter kalau perlu (opsional, tapi sudah aman dengan `public_id:project1*`)
    const filtered = result.resources.filter(
      (res) =>
        res.public_id === folder || res.public_id.startsWith(`${folder}-`)
    );

    const urls = filtered.map((file) => file.secure_url);

    return NextResponse.json({ images: urls });
  } catch (err) {
    console.error("Cloudinary Search Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
