import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/mongodb";
import project from "@/models/projects";

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
    const link = formData.get("link");
    const bahasa = JSON.parse(formData.get("bahasa"));
    const tools = JSON.parse(formData.get("tools"));
    const deskripsi = formData.get("deskripsi");

    const slugJudul = judul.replace(/\s+/g, "");

    const files = formData.getAll("foto"); // multiple files
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: `project-${slugJudul}_${i}`,
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

    const newProject = new project({
      judul,
      tanggal,
      link,
      bahasa,
      tools,
      deskripsi,
      foto: uploadedUrls, // array of URLs
    });

    const result = await newProject.save();

    return Response.json({
      message: "Project berhasil disimpan",
      insertedId: result._id,
    });
  } catch (error) {
    console.error("Error inserting project:", error);
    return Response.json(
      { message: "Gagal menyimpan project", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await project.find();

    return Response.json({ projects });
  } catch (error) {
    console.error("Error getting projects:", error);
    return Response.json({ message: "Gagal mengambil data" }, { status: 500 });
  }
}
