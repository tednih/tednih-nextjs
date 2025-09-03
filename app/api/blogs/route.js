import { v2 as cloudinary } from "cloudinary";
import blog from "@/models/blogs";
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

    const judul = formData.get("judul");
    const tanggal = formData.get("tanggal");
    const deskripsi = formData.get("deskripsi");
    const files = formData.getAll("foto"); // multiple files
    const uploadedUrls = [];
    const slugJudul = judul.replace(/\s+/g, "");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: `blog-${slugJudul}_${i}`,
              resource_type: "image",
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      uploadedUrls.push(uploadResult.secure_url);
    }

    const newBlog = new blog({
      judul,
      tanggal,
      deskripsi,
      foto: uploadedUrls,
    });

    const result = await newBlog.save();

    return Response.json({
      message: "Blog berhasil disimpan",
      insertedId: result._id,
    });
  } catch (error) {
    console.error("Error inserting Blog:", error);
    return Response.json({ message: "Gagal menyimpan Blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const blogs = await blog.find(); // sesuaikan dengan nama model `blog`

    return Response.json({ blogs });
  } catch (error) {
    console.error("Error ambil Blogs:", error);
    return Response.json({ message: "Gagal ambil Blogs" }, { status: 500 });
  }
}
