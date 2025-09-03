import { v2 as cloudinary } from "cloudinary";
import aboutProfile from "@/models/aboutProfile";
import dbConnect from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const nama = formData.get("nama");
    const username = formData.get("username");
    const password = formData.get("password");
    const deskripsi = formData.get("deskripsi");
    const file = formData.get("foto");

    let uploadedUrl = "";

    if (file && file.name) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: `profile-${nama.replace(/\s+/g, "-").toLowerCase()}`,
              resource_type: "image",
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      uploadedUrl = uploadResult.secure_url;
    }

    const newProfile = new aboutProfile({
      foto: uploadedUrl,
      nama,
      deskripsi,
      username,
      password,
    });

    await newProfile.save();

    return Response.json({ message: "Berhasil simpan Profile" });
  } catch (error) {
    console.error("Gagal menyimpan Profile:", error);
    return Response.json({ message: "Gagal", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const profile = await aboutProfile.find();

    return Response.json({ profile });
  } catch (error) {
    console.error("Error ambil profile:", error);
    return Response.json({ message: "Gagal ambil profile" }, { status: 500 });
  }
}
